#!/usr/bin/env python3
"""Import real project images from the company's original Google Sites homepage.

The importer never substitutes stock or competitor photographs. Every saved image must
be fetched successfully from the configured original site and pass image validation.
"""
from __future__ import annotations

import datetime as dt
import html
import io
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

import requests
from PIL import Image, ImageOps, UnidentifiedImageError

ORIGIN = 'https://www.milwaukeemasonryrepair.com/'
OUT = Path('assets/projects')
UA = ('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36')
HEADERS = {'User-Agent': UA, 'Accept': 'text/html,image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
           'Referer': ORIGIN, 'Accept-Language': 'en-US,en;q=0.9'}
URL_RE = re.compile(r'https?://(?:lh\d+(?:-us)?\.googleusercontent\.com)/sitesv-images-rt/[^\s"\'<>\\]+')
MAX_BYTES = 16_000_000


def find_image_urls(source: str) -> list[str]:
    """Return the Google Sites project images in page order; drop resize duplicates."""
    source = (html.unescape(source).replace('\\/', '/')
              .replace('\\u003d', '=').replace('\\u0026', '&')
              .replace('\\x3d', '=').replace('\\x26', '&'))
    seen, urls = set(), []
    for match in URL_RE.finditer(source):
        url = match.group().strip(';,\"\'&')
        # Any =w1280/=s1600 modifier is only a size variant of the same photo.
        base = re.sub(r'=(?:w\d+|s\d+|w\d+-h\d+)(?:-[^/?]+)?$', '', url)
        if base in seen:
            continue
        seen.add(base)
        urls.append(base)
    return urls


def variants(base: str) -> list[str]:
    return [base + '=w1600', base + '=w1280', base + '=s0', base]


def download_image(session: requests.Session, url: str) -> Image.Image:
    errors=[]
    for variant in variants(url):
        try:
            r=session.get(variant, headers=HEADERS, timeout=35)
            if not r.ok:
                raise RuntimeError('HTTP ' + str(r.status_code))
            if len(r.content)>MAX_BYTES:
                raise RuntimeError('Oversize image')
            if not r.headers.get('Content-Type', '').startswith('image/'):
                raise RuntimeError('Not an image, content-type=' + r.headers.get('Content-Type',''))
            im=Image.open(io.BytesIO(r.content)); im.verify()
            im=Image.open(io.BytesIO(r.content)); im=ImageOps.exif_transpose(im)
            if min(im.size)<180:
                raise RuntimeError('Image too small')
            return im
        except (requests.RequestException, RuntimeError, OSError, UnidentifiedImageError) as ex:
            errors.append(f'{variant[-32:]}: {ex}')
    raise RuntimeError('; '.join(errors))


def run() -> int:
    session=requests.Session()
    response=session.get(ORIGIN,headers=HEADERS,timeout=40)
    response.raise_for_status()
    candidates=find_image_urls(response.text)
    print('Found',len(candidates),'distinct Google Sites photo URL candidates')
    if not candidates:
        print('ERROR: No original project images discovered. No substitute photos used.',file=sys.stderr)
        return 1
    OUT.mkdir(parents=True,exist_ok=True)
    photos=[]
    for pos,url in enumerate(candidates,1):
        try:
            image=download_image(session,url)
            if image.mode!='RGB':image=image.convert('RGB')
            image.thumbnail((1800,1800),Image.Resampling.LANCZOS)
            filename=f'project-{pos:02d}.webp'
            image.save(OUT / filename,'WEBP',quality=86,method=6)
            photos.append({'id':f'project-{pos:02d}','title':f'Original project photo {pos:02d}',
                           'image':f'assets/projects/{filename}', 'category':'uncategorized',
                           'source':url, 'width':image.width,'height':image.height})
            print('OK ',filename,image.size,'bytes=',(OUT/filename).stat().st_size)
        except Exception as exc:
            print('FAIL',pos,str(exc)[:350],file=sys.stderr)
    if not photos:
        print('ERROR: Image URLs were discovered but none could be downloaded. No substitute photos used.',file=sys.stderr)
        return 2
    # Do not change the live website until each of the source images is available locally.
    manifest = {'source_site':ORIGIN,'imported_at_utc':dt.datetime.now(dt.timezone.utc).isoformat(),
                'caption':'Original project photos; per-service classifications pending visual review',
                'photos':photos}
    (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print('IMPORTED',len(photos),'of',len(candidates),'from source site')
    return 0 if len(photos)==len(candidates) else 3

if __name__ == '__main__':
    raise SystemExit(run())
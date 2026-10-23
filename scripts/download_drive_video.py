import urllib.request
import re
import sys

file_id = '1KHwedpXVG97Rr8Nv_TDSmxEe6D31SXQc'
url = f'https://drive.google.com/uc?export=download&id={file_id}'

opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor())
urllib.request.install_opener(opener)

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        content = resp.read()
        ctype = resp.headers.get('Content-Type', '')
        print('Initial download:', len(content), 'bytes, Content-Type:', ctype)
        if 'video' in ctype or 'octet-stream' in ctype or len(content) > 500000:
            with open('scripts/reference_video.mp4', 'wb') as f:
                f.write(content)
            print('Saved video to scripts/reference_video.mp4')
            sys.exit(0)
            
        text = content.decode('utf-8', errors='ignore')
        # Check for confirm code or download url
        confirm_match = re.search(r'confirm=([^&"\'\s]+)', text) or re.search(r'name="confirm"\s+value="([^"]+)"', text)
        uuid_match = re.search(r'name="uuid"\s+value="([^"]+)"', text)
        print('Confirm match:', confirm_match.group(1) if confirm_match else None)
        
        if confirm_match:
            confirm_code = confirm_match.group(1)
            download_url = f'https://drive.google.com/uc?export=download&confirm={confirm_code}&id={file_id}'
            if uuid_match:
                download_url += f'&uuid={uuid_match.group(1)}'
            print('Trying confirm url:', download_url)
            req2 = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2) as resp2:
                content2 = resp2.read()
                print('Second download:', len(content2), 'bytes, Content-Type:', resp2.headers.get('Content-Type'))
                with open('scripts/reference_video.mp4', 'wb') as f:
                    f.write(content2)
                print('Saved video to scripts/reference_video.mp4')
except Exception as e:
    print('Error:', e)

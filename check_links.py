import os
import re

directory = r'c:\Users\rtfre\.gemini\antigravity\scratch\Framework-Systems---Website'

html_files = []
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

all_hrefs = set()
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        hrefs = re.findall(r'href="([^"]+)"', content)
        for h in hrefs:
            if not h.startswith('http') and not h.startswith('#') and not h.startswith('mailto') and not h.startswith('tel'):
                all_hrefs.add(h)

print("Internal links found:")
for h in sorted(list(all_hrefs)):
    # Check if file exists
    path = h.strip('/')
    if not path:
        path = 'index.html'
    elif not path.endswith('.html') and '.' not in path:
        # Check if directory exists or if extensionless name exists as .html
        pass
    
    print(f"  {h}")

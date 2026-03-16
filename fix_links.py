import os
import re

def fix_links(directory):
    replacements = {
        r'href="index\.html"': 'href="/"',
        r'href="index\.html#': 'href="/#',
        r'href="services\.html"': 'href="/services"',
        r'href="services\.html#': 'href="/services#"',
        r'href="about\.html"': 'href="/about"',
        r'href="contact\.html"': 'href="/contact"',
        r'href="case-study\.html"': 'href="/case-study"',
        r'href="how-it-works\.html"': 'href="/how-it-works"',
        r'href="plumbing\.html"': 'href="/plumbing"',
        r'href="hvac\.html"': 'href="/hvac"',
        r'href="cleaning\.html"': 'href="/cleaning"',
        r'href="roofing\.html"': 'href="/roofing"',
        r'href="electrical\.html"': 'href="/electrical"',
        r'href="plumbing-operations-map\.html"': 'href="/plumbing-operations-map"',
        r'href="hvac-operations-map\.html"': 'href="/hvac-operations-map"',
        r'href="cleaning-operations-map\.html"': 'href="/cleaning-operations-map"',
        r'href="roofing-operations-map\.html"': 'href="/roofing-operations-map"',
        r'href="electrical-operations-map\.html"': 'href="/electrical-operations-map"',
    }

    for root, dirs, files in os.walk(directory):
        if '.git' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                for pattern, replacement in replacements.items():
                    new_content = re.sub(pattern, replacement, new_content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed links in: {path}")

if __name__ == "__main__":
    fix_links('.')

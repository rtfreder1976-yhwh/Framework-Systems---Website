import os
import re

directory = r'c:\Users\rtfre\.gemini\antigravity\scratch\Framework-Systems---Website'

html_files = []
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

nav_html = """  <nav>
   <a href="/" class="nav-logo">Framework<span>.</span></a>
   <button class="menu-toggle" aria-label="Toggle navigation"><span></span><span></span><span></span></button>
   <div class="nav-links">
     <a href="/services">Services</a>
     <div class="nav-dropdown"><a>Industries</a><div class="nav-dropdown-menu"><a href="/plumbing">Plumbing</a><a href="/hvac">HVAC</a><a href="/cleaning">Cleaning</a><a href="/roofing">Roofing</a><a href="/electrical">Electrical</a></div></div>
     <a href="/case-study">Case Study</a>
     <a href="/how-it-works">How It Works</a>
     <a href="/about">About</a>
     <a href="/contact" class="btn-primary" style="padding:10px 22px;font-size:1.05rem;">Get Your Framework</a>
   </div>
 </nav>"""

# Normalize nav_html for insertion
nav_html = nav_html.strip()

css_toggle_base = """
 .menu-toggle{display:none;flex-direction:column;gap:6px;background:none;border:none;cursor:pointer;z-index:1000;padding:10px}.menu-toggle span{display:block;width:25px;height:2px;background:var(--white);transition:0.3s}
 @media(max-width:900px){
 .menu-toggle{display:flex}
 .nav-links{position:fixed;top:0;right:-100%;width:80%;height:100vh;background:var(--navy);flex-direction:column;justify-content:center;gap:40px;transition:0.4s;z-index:900;box-shadow:-10px 0 30px rgba(0,0,0,0.5)}
 .nav-links.active{right:0}
 .menu-toggle.active span:nth-child(1){transform:translateY(8px) rotate(45deg)}
 .menu-toggle.active span:nth-child(2){opacity:0}
 .menu-toggle.active span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
 }
"""

js_script = """
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }"""

for file_path in html_files:
    # Skip index and about if they already look fine (manually checked)
    if os.path.basename(file_path) in ['index.html', 'about.html']:
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. CLEANUP TRACKING SCRIPT
    content = re.sub(r'(<script[^>]+src="https://api\.singingriverai\.com/js/external-tracking\.js"[^>]*>)\s*.*?(</script>)', r'\1\2', content, flags=re.DOTALL)

    # 2. ADD NAV IF MISSING
    if '<nav>' not in content:
        # Insert after <body>
        content = re.sub(r'(<body[^>]*>)', r'\1\n' + nav_html, content)
    else:
        # If nav exists but menu-toggle is missing, add it
        if '.menu-toggle' not in content and '<div class="nav-links">' in content:
            content = content.replace('<div class="nav-links">', '<button class="menu-toggle" aria-label="Toggle navigation"><span></span><span></span><span></span></button><div class="nav-links">')

    # 3. ADD CSS IF MISSING
    if '.menu-toggle' not in content:
        # This is tricky because we might have already added it in a previous run but it's not detected? 
        # No, re.DOTALL is not being used here.
        pass
    
    # Check if .menu-toggle CSS is present
    if '.menu-toggle{display:none' not in content:
        # Insert before </style>
        if '</style>' in content:
            content = content.replace('</style>', css_toggle_base + '\n</style>')

    # 4. ADD JS IF MISSING (and remove duplicate added by previous script)
    # Check for duplicate <script> with the same js_script
    content = content.replace(f"<script>{js_script}</script>", "") # Clear previous
    content = content.replace("<script>\n" + js_script + "</script>", "") # Clear previous
    
    # Find existing menuToggle scripts and remove them to start fresh
    content = re.sub(r'<script>\s*const menuToggle = document\.querySelector\(\'\.menu-toggle\'\);.*?</script>', '', content, flags=re.DOTALL)

    # Add fresh JS before </body>
    if '</body>' in content:
        js_block = f"<script>{js_script}</script>"
        content = content.replace('</body>', js_block + '\n</body>')
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {file_path}")

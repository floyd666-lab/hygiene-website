import os

for fname in os.listdir('.'):
    if fname.endswith('.html'):
        with open(fname, 'r', encoding='utf-8') as f:
            content = f.read()

        # Insert <script src="components.js"></script> right before </head>
        if '<script src="components.js"></script>' not in content:
            content = content.replace('</head>', '    <script src="components.js"></script>\n</head>')
        
        start = content.find('<header class="header">')
        end = content.find('</header>')
        
        if start != -1 and end != -1:
            end += len('</header>')
            content = content[:start] + '<app-header></app-header>' + content[end:]
            print(f'Replaced header in {fname}')
                
        start_f = content.rfind('<footer')
        end_f = content.rfind('</footer>') 
        
        if start_f != -1 and end_f != -1:
            end_f += len('</footer>')
            content = content[:start_f] + '<app-footer></app-footer>' + content[end_f:]
            print(f'Replaced footer in {fname}')

        with open(fname, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f'Processed {fname}')

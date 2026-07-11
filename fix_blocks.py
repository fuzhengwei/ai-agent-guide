#!/usr/bin/env python3
"""Fix broken multi-lang code blocks in ch12-framework-comparison.html.

The previous conversion created garbage TS/Go/Java code with "// Python:" comments.
This script replaces the TS/Go/Java panes with proper code for each block.
"""

import re

with open("chapters/ch12-framework-comparison.html", "r", encoding="utf-8") as f:
    content = f.read()

# Strategy: Find each broken pane and replace it.
# A pane looks like: <div class="code-lang-pane" data-lang="typescript" data-label="TypeScript"><pre>...</pre></div>
# We need to find broken panes (containing "// Python:") and replace their content.

# We'll match entire multi-lang blocks and fix the TS/Go/Java panes within them.

# Helper: find all multi-lang blocks
block_pattern = re.compile(
    r'(<div class="code-block" data-multi-lang>)\n'
    r'(.*?)'
    r'(</div>)',
    re.DOTALL
)

def is_broken(pane_content):
    return '// Python:' in pane_content

def extract_panes(block_inner):
    """Extract panes from block inner content."""
    pane_pattern = re.compile(
        r'<div class="code-lang-pane" data-lang="(\w+)" data-label="([^"]+)"><pre>(.*?)</pre></div>',
        re.DOTALL
    )
    panes = []
    last_end = 0
    for m in pane_pattern.finditer(block_inner):
        panes.append({
            'lang': m.group(1),
            'label': m.group(2),
            'code': m.group(3),
            'start': m.start(),
            'end': m.end(),
        })
    return panes

# Read the file
with open("chapters/ch12-framework-comparison.html", "r", encoding="utf-8") as f:
    content = f.read()

# We'll process block by block
blocks = list(block_pattern.finditer(content))
print(f"Found {len(blocks)} multi-lang blocks")

# Process in reverse order so offsets don't shift
fixed_count = 0
for match in reversed(blocks):
    block_start = match.start()
    block_end = match.end()
    block_text = match.group(0)
    block_inner = match.group(2)
    
    # Check if this block has broken panes
    if '// Python:' not in block_inner:
        continue
    
    panes = extract_panes(block_inner)
    if not panes:
        continue
    
    # Get the Python pane content (first pane, should be Python)
    python_pane = None
    for p in panes:
        if p['lang'] == 'python':
            python_pane = p
            break
    
    if not python_pane:
        continue
    
    python_code = python_pane['code']
    
    # Check if this is the Agent dialog block (line ~297) — skip it
    # That block contains "user_proxy:" and "assistant:" dialog, not real code
    if 'user_proxy:' in python_code and 'assistant:' in python_code and '```python' in python_code:
        # This is the dialog block — revert to non-multi-lang
        old_block = match.group(0)
        new_block = '<div class="code-block">\n  <span class="code-label">Agent 对话过程</span>\n<pre>' + python_code + '</pre>\n</div>'
        content = content[:block_start] + new_block + content[block_end:]
        fixed_count += 1
        continue
    
    # Generate proper TS/Go/Java code based on the Python code
    ts_code = generate_ts(python_code)
    go_code = generate_go(python_code)
    java_code = generate_java(python_code)
    
    # Rebuild the block
    new_panes = []
    for p in panes:
        if p['lang'] == 'python':
            new_panes.append(f'<div class="code-lang-pane" data-lang="python" data-label="Python"><pre>{p["code"]}</pre></div>')
        elif p['lang'] == 'typescript':
            new_panes.append(f'<div class="code-lang-pane" data-lang="typescript" data-label="TypeScript"><pre>{ts_code}</pre></div>')
        elif p['lang'] == 'go':
            new_panes.append(f'<div class="code-lang-pane" data-lang="go" data-label="Go"><pre>{go_code}</pre></div>')
        elif p['lang'] == 'java':
            new_panes.append(f'<div class="code-lang-pane" data-lang="java" data-label="Java"><pre>{java_code}</pre></div>')
        else:
            new_panes.append(f'<div class="code-lang-pane" data-lang="{p["lang"]}" data-label="{p["label"]}"><pre>{p["code"]}</pre></div>')
    
    new_block = '<div class="code-block" data-multi-lang>\n' + '\n'.join(new_panes) + '\n</div>'
    content = content[:block_start] + new_block + content[block_end:]
    fixed_count += 1

print(f"Fixed {fixed_count} blocks")

with open("chapters/ch12-framework-comparison.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")

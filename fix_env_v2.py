import os
import re

env_path = r'C:\Users\User\.gemini\antigravity\scratch\CareerPilot-Salone\.env.local'
if os.path.exists(env_path):
    with open(env_path, 'rb') as f:
        content = f.read().decode('utf-8', errors='ignore')
    
    # Try to find the start of the key and then all following parts
    match = re.search(r'OPENAI_API_KEY=(sk-[a-zA-Z0-9_-]+)', content)
    if match:
        key_start = match.group(0)
        # Find all other alphanumeric chunks that might be part of the key
        after_key = content[match.end():]
        # Look for the next assignment or end of file
        next_assignment = re.search(r'\n[A-Z_]+=', after_key)
        relevant_part = after_key[:next_assignment.start()] if next_assignment else after_key
        
        # Clean the relevant part of whitespace/newlines and join it to the start
        cleaned_suffix = re.sub(r'[\s\r\n]+', '', relevant_part)
        full_key = key_start + cleaned_suffix
        
        # Replace the broken part with the cleaned full key
        pattern = r'OPENAI_API_KEY=sk-[a-zA-Z0-9_\- \r\n]+(?=\n[A-Z_]+=|$)'
        # This is tricky because of the weird spacing.
        # Let's just reconstruct the whole file content.
        
        new_lines = []
        for line in content.splitlines():
            if '=' in line:
                var = line.split('=')[0].strip()
                if var == 'OPENAI_API_KEY':
                    new_lines.append(full_key)
                elif var:
                    new_lines.append(line)
            elif line.strip() and not line.strip().startswith('OPENAI_API_KEY'):
                new_lines.append(line)

        # Ensure AI_MODE is set correctly if we are using OpenAI
        if not any(l.startswith('AI_MODE=') for l in new_lines):
            new_lines.append('AI_MODE=openai')

        with open(env_path, 'w') as f:
            f.write('\n'.join(new_lines) + '\n')
        print(f"Cleaned key: {full_key[:20]}...")
    else:
        print("Could not find OPENAI_API_KEY start")
else:
    print(".env.local not found")

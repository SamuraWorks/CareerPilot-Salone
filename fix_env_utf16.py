import os

env_path = r'C:\Users\User\.gemini\antigravity\scratch\CareerPilot-Salone\.env.local'
if os.path.exists(env_path):
    # Read as UTF-16 LE with BOM
    with open(env_path, 'rb') as f:
        raw_data = f.read()
    
    try:
        content = raw_data.decode('utf-16')
    except Exception as e:
        print(f"Failed to decode as utf-16: {e}")
        # Fallback to utf-8 if it was already utf-8
        content = raw_data.decode('utf-8', errors='ignore')

    # Now clean the content
    lines = content.splitlines()
    new_lines = []
    
    current_key_name = None
    current_key_parts = []
    
    for line in lines:
        stripped = line.strip()
        if not stripped: continue
        
        if '=' in stripped:
            if current_key_name:
                # Close previous key
                new_lines.append(f"{current_key_name}={''.join(current_key_parts)}")
                current_key_name = None
                current_key_parts = []
            
            name, value = stripped.split('=', 1)
            name = name.strip()
            value = value.strip()
            
            if name == 'OPENAI_API_KEY':
                current_key_name = name
                current_key_parts = [value]
            else:
                new_lines.append(f"{name}={value}")
        else:
            if current_key_name:
                current_key_parts.append(stripped)
            else:
                # Unknown line, keep it
                new_lines.append(stripped)
    
    if current_key_name:
        new_lines.append(f"{current_key_name}={''.join(current_key_parts)}")

    # Write back as UTF-8 (standard)
    with open(env_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines) + '\n')
    
    print("Fixed .env.local (converted to UTF-8 and cleaned keys)")
else:
    print(".env.local not found")

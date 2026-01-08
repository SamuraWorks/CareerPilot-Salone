import os

env_path = r'C:\Users\User\.gemini\antigravity\scratch\CareerPilot-Salone\.env.local'
if os.path.exists(env_path):
    with open(env_path, 'r') as f:
        lines = f.readlines()
    
    new_lines = []
    current_key = None
    collecting_key = False
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('OPENAI_API_KEY='):
            current_key = stripped
            collecting_key = True
        elif collecting_key and stripped and not '=' in stripped:
            current_key += stripped
        elif collecting_key and ('=' in stripped or not stripped):
            if current_key:
                new_lines.append(current_key + '\n')
            current_key = None
            collecting_key = False
            if stripped:
                new_lines.append(line)
        else:
            new_lines.append(line)
            
    if current_key:
        new_lines.append(current_key + '\n')

    with open(env_path, 'w') as f:
        f.writelines(new_lines)
    print("Fixed .env.local")
else:
    print(".env.local not found")

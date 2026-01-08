import os
env_path = r'C:\Users\User\.gemini\antigravity\scratch\CareerPilot-Salone\.env.local'
if os.path.exists(env_path):
    with open(env_path, 'rb') as f:
        data = f.read(200)
        print(data)

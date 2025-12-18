#!/usr/bin/env python3
"""
Script to trigger model training on Render
"""
import requests
import time

url = "https://full-stack-brain-tumor-analysis.onrender.com/train"
print(f"🚀 Sending training request to {url}...")
print("⏳ This may take a moment...\n")

try:
    # Send request with short timeout (training runs in background)
    response = requests.post(url, timeout=10)
    print(f"✅ Response status: {response.status_code}")
    
    if response.status_code == 200:
        try:
            data = response.json()
            print(f"✅ Response: {data}")
        except:
            print(f"Response text: {response.text[:500]}")
    else:
        print(f"⚠️  Status {response.status_code}: {response.text[:500]}")
    
    print("\n" + "="*60)
    print("✅ Training request sent!")
    print("⚠️  IMPORTANT: Check Render logs to monitor training progress.")
    print("⚠️  Training takes 10-15 minutes.")
    print("="*60)
    
except requests.exceptions.Timeout:
    print("✅ Request sent (timeout expected - training runs in background)")
    print("⚠️  Check Render logs to monitor training progress.")
    print("⚠️  Training takes 10-15 minutes.")
except requests.exceptions.RequestException as e:
    print(f"❌ Error: {e}")
    print("\nTry manually:")
    print("1. Go to Render Dashboard")
    print("2. Open your backend service")
    print("3. Use the 'Shell' feature to run:")
    print("   curl -X POST http://localhost:10000/train")
except Exception as e:
    print(f"❌ Unexpected error: {e}")


import os
import json
import requests
from config import OPENAI_API_KEY
from database import init_db, save_review

OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

def lambda_handler(event, context):
    # 1. Parse the incoming JSON
    try:
        payload = json.loads(event.get("body","{}"))
        code = payload.get("code","")
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON"})
        }

    # 2. If no code, quick response
    if not code:
        review = "No code provided."
    else:
        # 3. Make the OpenAI API call via requests
        resp = requests.post(
            OPENAI_API_URL,
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system",
                     "content": "You are a senior software engineer. Review the code for style, security, and performance issues."},
                    {"role": "user", "content": code}
                ],
                "temperature": 0.2
            },
            timeout=10
        )

        if resp.status_code != 200:
            review = f"OpenAI error {resp.status_code}: {resp.text}"
        else:
            data = resp.json()
            review = data["choices"][0]["message"]["content"]

    init_db()
    save_review(code, review)        

    # 4. Return the review
    return {
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",      # ← allow any origin
    "Access-Control-Allow-Headers": "*"      # ← allow all headers
  },
  "body": json.dumps({"review": review})
}

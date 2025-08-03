import os
import json
from database import get_connection

def lambda_handler(event, context):
    # 1. Connect & fetch rows
    conn = get_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, code, review, created_at FROM reviews ORDER BY created_at DESC LIMIT 100;")
            rows = cur.fetchall()

    # 2. Return as JSON
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"    # CORS for React
        },
        "body": json.dumps(rows, default=str)
    }

import os

# OpenAI key you added to your shell environment
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

# Database connection (we’ll wire these up later when we use RDS or another SQL engine)
DB_HOST     = os.environ.get("DB_HOST")
DB_USER     = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_NAME     = os.environ.get("DB_NAME")

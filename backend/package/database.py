import os
import pymysql

# Read DB config from environment
DB_HOST     = os.environ["DB_HOST"]
DB_USER     = os.environ["DB_USER"]
DB_PASSWORD = os.environ["DB_PASSWORD"]
DB_NAME     = os.environ["DB_NAME"]

def get_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor,
        connect_timeout=5
    )

def init_db():
    """Create the reviews table if it doesn't exist."""
    ddl = """
    CREATE TABLE IF NOT EXISTS reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code TEXT NOT NULL,
      review TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    conn = get_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute(ddl)
        conn.commit()

def save_review(code, review_text):
    """Insert a reviewed code snippet."""
    sql = "INSERT INTO reviews (code, review) VALUES (%s, %s);"
    conn = get_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute(sql, (code, review_text))
        conn.commit()

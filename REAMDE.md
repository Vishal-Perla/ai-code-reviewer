# AI-Powered Code Reviewer

> Automatically review code snippets for style, security, and performance using OpenAI’s GPT-3.5-turbo, store results in a database, and explore them via a React dashboard.

---

## 🔗 Live Demo

[https://main.d3why3s3rwilu.amplifyapp.com/](https://main.d3why3s3rwilu.amplifyapp.com/)

---

## 🚀 Features

- **Automated LLM Reviews**  
  - Submits arbitrary JS snippets to OpenAI and gets feedback on style, security, and performance.
- **Persistent Storage**  
  - Saves each snippet + review in a database for historical lookup.
- **Interactive React Dashboard**  
  - Browse past reviews, submit new snippets, with smooth animations and responsive UI.
- **Serverless Backend**  
  - AWS Lambda + API Gateway for review and listing endpoints.
- **Zero-Config Hosting & CI/CD**  
  - GitHub → AWS Amplify pipeline for automatic builds and HTTPS hosting.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion  
- **Backend:** Python, AWS Lambda, API Gateway  
- **Database:** MySQL (Amazon RDS) & PyMySQL  
- **LLM:** OpenAI GPT-3.5-turbo  
- **Hosting:** AWS Amplify

---

## 📦 Getting Started

### Prerequisites

- Node.js (v16+) & npm  
- Python 3.8+ & pip  
- AWS CLI configured with an IAM user  
- OpenAI API key (`OPENAI_API_KEY`)

### Local Setup

#### Backend

```bash
cd backend
python -m venv .venv
# macOS/Linux
source .venv/bin/activate
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Export your environment variables:
export OPENAI_API_KEY="your_openai_key"
export DB_HOST="your_rds_endpoint"
export DB_USER="adminuser"
export DB_PASSWORD="your_password"
export DB_NAME="code_reviews"

# Test locally
python - << 'EOF'
from lambda_function import lambda_handler
print(lambda_handler({"body":"{\"code\":\"console.log('hello')\"}"}, None))
EOF
Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Open http://localhost:5173 to see the app.

📈 Deployment
Push your code to GitHub (main branch).

In /frontend, create .env.production with:

ini
Copy
Edit
VITE_API_BASE_URL=https://<YOUR_API_ID>.execute-api.us-west-1.amazonaws.com
In AWS Amplify:

Connect your GitHub repo & main branch.

Enable Monorepo root = frontend.

Set env var VITE_API_BASE_URL to your invoke URL.

Save & deploy.

Your live site will update automatically on each push.

📄 License
MIT © Vishal Perla

makefile
Copy
Edit
::contentReference[oaicite:0]{index=0}

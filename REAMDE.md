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


## 🚧 How I Built It

I wanted to create an end-to-end demo of modern serverless + AI integration, so here’s the story of how it came together:

1. **Set up my workspace**  
   - Installed VS Code, Git, Node.js, Python 3, and the AWS CLI.  
   - Created a GitHub repo and cloned it locally.

2. **Scaffolded the backend**  
   - Used Python for two simple AWS Lambda functions:  
     - **`POST /review`** calls OpenAI’s GPT-3.5-turbo via `requests`, parses the code snippet, and returns feedback.  
     - **`GET /reviews`** queries a MySQL table (later DynamoDB) and returns all stored reviews as JSON.  
   - Wrote a `database.py` helper using PyMySQL to initialize the `reviews` table and insert rows.
   - Configured environment variables in Lambda for `OPENAI_API_KEY`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`.

3. **Provisioned the database**  
   - Started with Amazon RDS MySQL (db.t3.micro), created the `code_reviews` database, and opened port 3306.  
   - Later switched to DynamoDB (on-demand) to stay in the free tier permanently.

4. **Deployed Lambdas**  
   - Built ZIP packages by installing dependencies into a `package/` folder, zipping in my `.py` files.  
   - Uploaded them via the AWS Console, set the handler names (`lambda_function.lambda_handler` and `get_reviews.lambda_handler`), and bumped the timeout to 15 s.  
   - Added CORS headers and configured API Gateway (HTTP API) with `/review` and `/reviews` routes.

5. **Built the React frontend**  
   - Bootstrapped with Vite (`npm create vite@latest . --template react`).  
   - Installed `axios`, `Tailwind CSS`, and `Framer Motion` for styling + animations.  
   - Created a submission form that sends `POST /review`, then refreshes the list via `GET /reviews`.  
   - Styled with Tailwind utilities: cards, rounded corners, dark mode, responsive layout.

6. **Set up CI/CD & hosting**  
   - Pushed the monorepo (with `frontend/` and `backend/`) to GitHub.  
   - Connected AWS Amplify to the `main` branch, marked it as a monorepo with root `frontend`.  
   - Added a `VITE_API_BASE_URL` environment variable pointing to my API Gateway URL.  
   - Amplify automatically builds (`npm run build`) and deploys to a public HTTPS URL.

7. **Cost controls & cleanup**  
   - Enabled OpenAI’s free-credits cap (no surprise $ beyond $5).  
   - Turned on AWS Free Tier and Billing Alerts in us-east-1 to email me if charges exceed $1.  
   - Plan to stop/delete the RDS instance when idle, or move entirely to DynamoDB free-tier.

---

Now you have a serverless, AI-powered code reviewer that fits in a resume bullet and runs 24/7 for pennies a year. Feel free to explore the code, deploy your own, or extend it with auth, analytics, or custom LLM prompts!  


::contentReference[oaicite:0]{index=0}

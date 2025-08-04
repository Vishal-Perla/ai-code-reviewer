# AI-Powered Code Reviewer

> Automatically review code snippets for style, security, and performance using OpenAI’s GPT-3.5-turbo, store results in a database, and explore them via a React dashboard.

I created this AI-powered code reviewer to streamline how developers get feedback on their pull requests or code snippets. By combining serverless architecture, an LLM, and a simple dashboard, I built a hire-worthy demo that’s both practical and easy to extend.

### Practical Uses
- **Instant PR Feedback:** Auto-review code style, security flaws, and performance issues before human review.  
- **Team Metrics:** Track common error types and review turnaround times over time.  
- **Learning Tool:** Junior devs can paste snippets and learn best practices from an AI mentor.

### How I Built It

1. **Backend Lambdas**  
   - **Review Function** (`POST /review`)  
     - Written in Python, deployed to AWS Lambda.  
     - Receives a code snippet, calls OpenAI’s GPT-3.5-turbo via a REST request, and returns structured feedback.  
   - **List Function** (`GET /reviews`)  
     - Reads saved reviews from a database and returns them as JSON.  
   - Both functions include CORS headers so my React app can talk to them directly.

2. **Persistent Storage**  
   - **Initial Prototype:** Amazon RDS MySQL with a `reviews` table.  
   - **Free-Tier Migration:** Swapped to DynamoDB on-demand tables to stay within free usage.  
   - Used a small Python helper (`database.py`) to initialize tables and insert or scan review items.

3. **API Gateway**  
   - Created an HTTP API in AWS API Gateway.  
   - Defined two routes—`/review` (POST) and `/reviews` (GET)—each integrated with the corresponding Lambda.

4. **React Frontend**  
   - Bootstrapped with Vite and React.  
   - Styled with Tailwind CSS and enhanced with Framer Motion for smooth animations.  
   - Built a submission form to call `POST /review`, then dynamically refresh the history from `GET /reviews`.  
   - Responsive layout with syntax-highlighted code cards and timestamps.

5. **CI/CD & Hosting**  
   - Pushed my monorepo (with `frontend/` and `backend/`) to GitHub.  
   - Connected AWS Amplify to the `main` branch, marked it as a monorepo rooted at `frontend`.  
   - Added an environment variable (`VITE_API_BASE_URL`) pointing to my live API.  
   - Amplify automatically builds (`npm run build`) and hosts the site at HTTPS.

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

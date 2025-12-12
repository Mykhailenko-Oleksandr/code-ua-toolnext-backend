## 📄 README.md

# Project - ToolNext (Backend side)

Backend part of the final team project **ToolNext** (React + Node.js).
Frontend repository: `tool-next-frontend` (will be connected via API).

---

## 🚀 Project Goals

- Build the final project within the given deadline (React + Node.js).
- Gain practical experience in teamwork, Git workflow, and task planning.
- Learn branching, merging, and conflict resolution.
- Work with Trello for task management.
- Prepare for team roles (Team Lead, Scrum Master).
- Present the project as a team.
- Deliver full functionality according to the technical requirements.

---

## 📌 Getting Started

### 1. Team Lead

- Create the repository `tool-next-backend`.
- Invite all team members as collaborators.
- Create main branches: `main`, `dev`.

### 2. Team Members

- Clone the repository:
  ```bash
  git clone <repo-url>
  cd tool-next-backend
  ```

````
- Install dependencies:
  ```bash
  npm install
  ```
- Create a new branch for your task:
  ```bash
  git switch -c task-<number>
  ```
  Example:
  ```bash
  git switch -c task-5
  ```
### 3. Development Workflow
- Work only in your task branch.
- Commit changes with clear messages in English:
  ```bash
  git commit -m "feat: implement user model"
  ```
- Push your branch:
  ```bash
  git push origin task-<number>
  ```
- Open a Pull Request to `dev` branch.
- Team Lead reviews and merges PRs.
---
## 📂 Project Structure
```
TOOL-NEXT-BACKEND/
├── node_modules/                 # Installed dependencies (not committed)
├── src/
│   ├── constants/
│   │   └── time.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingsController.js
│   │   ├── categoriesController.js
│   │   ├── feedbacksController.js
│   │   ├── toolsController.js
│   │   └── usersController.js
│   ├── db/
│   │   └── connectMongoDB.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── multer.js
│   │   └── notFoundHandler.js
│   ├── models/
│   │   ├── session.js
│   │   ├── tool.js
│   │   └── user.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingsRoutes.js
│   │   ├── categoriesRoutes.js
│   │   ├── feedbacksRoutes.js
│   │   ├── toolsRoutes.js
│   │   └── usersRoutes.js
│   ├── services/
│   │   ├── auth.js
│   │   └── cloudinary.js
│   ├── utils/
│   │   └── saveFileToCloudinary.js
│   ├── validations/
│   │   ├── authValidation.js
│   │   ├── bookingsValidation.js
│   │   ├── feedbacksValidation.js
│   │   ├── toolsValidation.js
│   │   └── usersValidation.js
│   └── server.js                 # Entry point of the backend app
├── .editorconfig
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package-lock.json
├── package.json
├── pullrequest-list.txt
└── README.md
```
---
## 🛠 Technical Requirements
- Node.js + Express for backend.
- MongoDB + Mongoose for database.
- JWT or session-based authentication.
- Swagger for API documentation.
- Environment variables stored in `.env` (with `.env.example` template).
- Code style enforced with ESLint + Prettier.
- Deployment on Render or similar service.
---
## 📎 For submission
- Links to your Pull Requests.
- Link to Swagger documentation.
- Link to GitHub Pages (frontend).
```
````

# AI Interview Platform

A production-ready AI-powered interview preparation platform built with Next.js, MongoDB, Redis, GraphQL, and OpenRouter AI. Users can register or sign in, create interview sessions, generate questions automatically, conduct mock voice interviews, upload resumes for AI review, and get actionable feedback.

---

## Project Overview

This project provides an end-to-end interview practice experience with:

- User authentication via email/password and Google OAuth
- AI-generated interview questions based on job details
- Real-time voice interview simulation using `@vapi-ai/web`
- AI-powered resume analysis and feedback generation
- Interview history, scheduling, and feedback retrieval
- Apollo GraphQL for feedback querying
- Redis caching and rate limiting for interview data

---

## Features

- Sign up / log in using credentials or Google
- JWT-based auth with `accessToken` / `refreshToken` cookies
- Interview creation with job title, description, duration, and interview types
- AI question generation via OpenRouter and a prompt-driven OpenAI client
- Resume upload and AI analysis
- Real-time interview session playback using live audio/video
- Feedback generation from recorded conversation transcripts
- Latest interview caching with Redis
- GraphQL endpoint for feedback details

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Apollo Client + Apollo Server
- GraphQL
- MongoDB + Mongoose
- JWT authentication
- Firebase client-side Google OAuth
- OpenAI package with OpenRouter base URL
- `@vapi-ai/web` for voice interview sessions
- Upstash Redis for caching and rate limiting
- PDF parsing via `pdf-parse-fork` + `pdfjs-dist`

---

## Architecture

The app is structured as a modern full-stack Next.js application using the App Router with both REST and GraphQL APIs.

- `src/app/` - UI pages, components, auth, dashboard, interviews
- `src/server/` - backend controllers, services, models, middleware, lib
- `src/graphql/` - GraphQL schema, resolvers, client config
- `src/lib/redis.ts` - Redis client and caching helpers
- `src/firebase/` - Firebase initialization for client-side authentication
- `src/app/api/` - route handlers for REST endpoints

The backend follows a controller/service/model separation:

- Controller: business logic and external API calls
- Service: application-level orchestration
- Model: Mongoose schema definitions

---

## Folder Structure

```text
src/
  app/
    (auth)/                # Login/signup pages
    api/                   # REST and GraphQL route handlers
      (auth)/
      authme/
      fetchFeedbackDetails/
      fetchInterviewData/
      graphql/
      interviewFeedback/
      latestInterviews/
      saveInterview/
      uploadResume/
      (openSourceAPI)/
        getQuestionList/
    dashboard/             # Interview dashboard and flow pages
      createInterview/
      interview/
        [interview_id]/
          start/
          completed/
    components/            # Shared UI components
    context/               # React context providers
    graphql/               # Apollo client, queries, mutations
    validators/            # Zod validation schemas
  server/
    config/                # environment validation
    controllers/           # request handling + AI integration
    lib/                   # database, JWT, bcrypt helpers
    middlewares/           # route middleware helpers
    models/                # MongoDB schemas
    services/              # business services and orchestration
    types/                 # shared TypeScript types
  lib/
    redis.ts               # Redis client configuration
  firebase/                # Firebase auth initialization

README.md
package.json
next.config.ts
```

---

## Authentication Flow

1. User signs up or logs in from the client.
2. Client submits credentials or Google profile details to `/api/(auth)/signup` or `/api/(auth)/login`.
3. Backend validates input with Zod and verifies credentials.
4. Passwords are hashed with bcrypt in registration.
5. On success, the server issues `accessToken` and `refreshToken` cookies.
6. Client can confirm authentication via `/api/authme`.

Cookies are set as `httpOnly`, `sameSite: strict`, and last for the configured lifetime.

---

## AI Interview Flow

1. User creates an interview session from the dashboard.
2. The app collects job details, duration, and interview types.
3. The question-generation endpoint calls OpenRouter via `openai.chat.completions.create()`.
4. Generated questions are stored in MongoDB with the interview record.
5. During interview playback, `@vapi-ai/web` starts a live voice assistant session.
6. The session uses GPT-based prompts to ask questions one-by-one and capture conversation transcripts.
7. On completion, the conversation is sent to `/api/interviewFeedback`.
8. AI feedback is generated server-side, parsed as JSON, stored in MongoDB, and returned to the user.

---

## API Routes

### Auth & User

- `POST /api/(auth)/signup` - register user, returns cookies
- `POST /api/(auth)/login` - authenticate user, returns cookies
- `GET /api/authme` - validate current session and return user info

### Interview Management

- `POST /api/saveInterview` - persist interview metadata and questions
- `GET /api/latestInterviews` - fetch latest or scheduled interviews (`email`, `allInterviews`, `scheduledInterviews` query params)
- `GET /api/fetchInterviewData` - retrieve interview payload by `interview_id`
- `GET /api/fetchFeedbackDetails` - fetch stored feedback by `interviewId`
- `POST /api/interviewFeedback` - submit interview transcript for AI feedback
- `POST /api/uploadResume` - upload a resume file and analyze it against job description

### Open Source / AI Helpers

- `POST /api/(openSourceAPI)/getQuestionList` - generate AI interview questions from job metadata

### GraphQL

- `GET/POST /api/graphql` - GraphQL endpoint for queries and mutations

---

## GraphQL Usage

GraphQL is exposed at `/api/graphql` via `ApolloServer` and is consumed by the client through `src/providers/ApolloWrapper.tsx`.

Supported operations:

- Query `fetchFeedbackDetails(interviewId: String!)` returns stored conversation and structured feedback.
- Mutation `getQuestionList(input: QuestionInput!)` generates a question list from AI.

Example query:

```graphql
query MyFeedbackQuery($interviewId: String!) {
  fetchFeedbackDetails(interviewId: $interviewId) {
    interviewID
    userName
    allConversation {
      role
      content
    }
    feedback {
      summery
      Recommendation
      RecommendationMsg
      rating {
        technicalSkills
        communication
        problemSolving
        experience
      }
    }
  }
}
```

---

## Redis Usage

Redis is configured in `src/lib/redis.ts` using Upstash credentials.

- Caches the `latest_interviews` query for improved performance.
- Applies IP-based rate limiting on `/api/latestInterviews`.
- Deletes the cache key when a new interview is saved via `/api/saveInterview`.

This helps reduce database load and keep interview listings responsive.

---

## OpenRouter Integration

AI calls are routed through OpenRouter in server-side controllers:

- `src/server/controllers/questionListController.ts`
- `src/server/controllers/resumeController.ts`
- `src/server/controllers/interviewController.ts`

Each controller uses the `openai` package with:

- `baseURL: https://openrouter.ai/api/v1`
- `apiKey: process.env.OPEN_ROUTER_API_KEY`
- `model: process.env.OPEN_ROUTER_MODEL`

This enables question generation, resume insight extraction, and feedback creation.

---

## Environment Variables

Required server-side variables:

- `MONGO_URL` - MongoDB connection string
- `TOKEN_SECRET` - JWT signing secret
- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST endpoint
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis auth token
- `OPEN_ROUTER_API_KEY` - OpenRouter API key
- `OPEN_ROUTER_MODEL` - OpenRouter-compatible model name
- `SITE_URL` - base site URL used in OpenRouter request headers

Required client-side variables:

- `NEXT_PUBLIC_VAPI_API_KEY` - VAPI public key for live interview sessions
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT` - Apollo client GraphQL endpoint
- `NEXT_PUBLIC_API_KEY` - Firebase API key
- `NEXT_PUBLIC_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_MEASUREMENT_ID` - Firebase measurement ID

---

## Installation

```bash
git clone <repo-url>
cd ai-interview-platform
npm install
```

Create a `.env.local` file with the required env variables, then run:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Deployment

### Production build

```bash
npm run build
npm run start
```

### Vercel

1. Push the repository to GitHub.
2. Connect the repo to Vercel.
3. Add all required environment variables to Vercel dashboard.
4. Deploy.

Ensure the Redis and MongoDB credentials are configured in the Vercel environment.

---

## User Flow

1. Landing page welcomes the user.
2. User signs in or signs up with Google/email.
3. User navigates to the dashboard.
4. User creates a new interview with job details.
5. The system generates interview questions.
6. User begins a live AI-driven mock interview session.
7. User ends the session and receives AI-generated feedback.
8. User can review past interviews, scheduled sessions, and feedback.

---

## Future Improvements

- Add stronger access control and server-side route guards.
- Implement refresh token rotation and logout endpoint.
- Add a dedicated interview scheduling/calendar feature.
- Separate AI prompt templates into configurable services.
- Add a better resume file preview / supported file type validation.
- Improve GraphQL schema coverage for interview histories.
- Add automated unit and integration tests.
- Add production-grade monitoring and error tracking.

---

## Package Summary

Key dependencies:

- `next` 16.0.10
- `react` 19.2.1
- `@apollo/client`, `@apollo/server`
- `graphql`
- `mongoose`, `mongodb`
- `jsonwebtoken`, `bcrypt`, `bcryptjs`
- `firebase`
- `openai`
- `@vapi-ai/web`
- `@upstash/redis`
- `tailwindcss`, `postcss`, `autoprefixer`
- `react-toastify`, `lucide-react`, `framer-motion`

Dev dependencies:

- `typescript`
- `eslint`
- `eslint-config-next`
- `@types/node`, `@types/react`, `@types/react-dom`

---

## Notes

This project is designed for a production-ready interview preparation experience. The current implementation already includes REST and GraphQL APIs, AI-backed content generation, real-time voice interviews, caching, and a scalable Next.js architecture.

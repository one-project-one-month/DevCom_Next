# DevLoop

DevLoop is a social developer community app built with Next.js App Router. It includes authentication, a feed with search, post creation, post details with comments, and an admin dashboard.

## What You Can Do

- Sign in with email or OAuth
- Search the feed by title, tags, author name, and author handle
- Create posts with tags and optional image upload
- Edit your own posts
- View post details in a dialog with comments
- Add comments and replies
- Report or hide comments (moderation flow)
- Manage profile info and avatar
- Use the admin dashboard for overview, users, moderation, and settings

## Routes

Public / App
- `/` Feed with search
- `/create-post` Post editor (create or edit)
- `/profile` Your profile view
- `/profile/[handle]` Public profile view
- `/settings` User settings

Auth
- `/login` Login page
- `/callback` OAuth callback page

Admin
- `/admin` Redirects to overview
- `/admin/overview` Admin summary dashboard
- `/admin/users` User management
- `/admin/moderation` Moderation queue
- `/admin/settings` Admin settings
- `/admin/not-authorized` Access denied

## API Usage (Frontend)

The UI calls these backend endpoints:

Auth
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/auth/:provider/login`

Posts
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`

Comments
- `GET /api/posts/:id/comments`
- `POST /api/posts/:id/comments`
- `DELETE /api/comments/:id`
- `PATCH /api/comments/:id/status`

Reactions + Reports
- `POST /api/reactions`
- `POST /api/reports`

Admin
- `GET /api/admin/overview`
- `GET /api/admin/users`
- `GET /api/admin/posts/reported`
- `GET /api/admin/reports`
- `PATCH /api/admin/users/:id/role`
- `PATCH /api/admin/users/:id/status`
- `PATCH /api/admin/posts/:id/status`
- `DELETE /api/admin/posts/:id`
- `PATCH /api/reports/:id`

Uploads
- `POST /api/uploads/image`

## Data Flow

- React Query handles fetching and caching.
- The auth token is stored in Zustand and injected as a Bearer token by `lib/api/fetcher.ts`.
- UI updates optimistically for moderation actions in the post detail dialog.

## Tech Stack

- Next.js App Router
- React Query
- Zustand
- Tailwind CSS
- shadcn/ui components

## Getting Started

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Open the app:

```
http://localhost:3000
```

## Environment Variables

Create a `.env` file and set:

```
NEXT_PUBLIC_API_BASE_URL=your_api_url
```

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # start production server
npm run lint    # lint
```

## Project Structure

```
app/               # Next.js routes
components/        # UI + feature components
hooks/             # React hooks
lib/               # API + helpers
store/             # Zustand stores
```

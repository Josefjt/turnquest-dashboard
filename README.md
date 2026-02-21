# TurnQuest Dashboard

TurnQuest is a simplified Jira-style dashboard for tracking team work with a Kanban board, user points, and team chat.

This app runs fully in the browser using local storage (no Firebase/backend required).

## What The App Does

- User authentication (signup/login/logout)
- Ticket management on a Kanban board:
- statuses: `Open`, `In progress`, `Review / QA`, `Done`
- drag-and-drop status updates
- ticket details modal + admin delete
- Team points view (leaderboard style)
- Admin user management:
- edit user profile info 
- activate/deactivate users
- award points
- Team chat panel

## Roles

- `admin`
- can access user management
- can mark tickets as `Done`
- can create tickets directly in `Done`
- `user`
- can use board/points/profile/chat
- cannot mark tickets as `Done`

## Login Credentials

On first run, TurnQuest seeds an admin user:

- Email: `admin@turnquest.local`
- Password: `admin123`

You can also create regular users from the signup page.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

- `http://127.0.0.1:5173`

4. Sign in with the seeded admin account above.

## Local Data Behavior

The app stores all data in browser `localStorage`:

- users
- tickets
- messages
- session

Data is local to your browser/device and is not shared or synced.

## Reset App Data

Clear local storage for the app origin (`127.0.0.1:5173`) to fully reset users, tickets, chat, and session.

## Scoring Rules

- Points are awarded when a ticket is moved to `Done`.
- Points are removed if that ticket is moved out of `Done`.
- Ticket delete also removes previously awarded points for that ticket.

## Useful Commands

- `npm run dev` - start local dev server
- `npm run lint` - run ESLint
- `npm run build` - production build

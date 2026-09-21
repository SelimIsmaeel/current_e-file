# E-File Management System

A lightweight, front-end-only file assignment and submission tracker with two portals — an **Admin Portal** and a **User Portal** — built with plain HTML, CSS, and JavaScript. All data is persisted client-side in `localStorage`, so the app runs entirely in the browser with no backend or database server required.

## Features

### Admin Portal (`admin.html`)
- **Dashboard** — key stats (users, total files, pending/approved reviews), file distribution by category, and a recent activity feed
- **Users** — create, activate/deactivate, and delete user accounts
- **Upload Files** — dispatch a file with a title, description, category, and due date to one or more users
- **Files & Folders** — view and manage every file that's been dispatched, with download/delete actions
- **Submissions** — review files users have submitted back, approve or reject with remarks
- **Tracking** — an audit log of user activity (assignments, submissions, approvals/rejections, downloads), with per-action filtering and summary stats
- **Reports** — high-level completion-rate metrics
- **Notifications** — system alerts relevant to the admin
- **Settings / Profile** — update name, phone, password, and profile photo

### User Portal (`index.html`)
- **Register / Log In** — new accounts self-register as standard users; admins are added manually
- **Dashboard** — a summary of assigned tasks and their status
- **My Files** — files assigned to the logged-in user
- **Upload Completed File** — submit a finished file back for admin review
- **My Submissions** — track the status and feedback on submitted work
- **Notifications**, **Profile**, and **Help & Support**

Both portals share the same underlying data store, so an action taken in one (e.g. a user downloading a file) is immediately reflected in the other (e.g. the admin's Tracking log).

## Tech Stack

- **HTML/CSS/JavaScript** — no frameworks, no build step
- **Font Awesome** (`all.css`) — icon set used throughout the UI
- **`localStorage`** — acts as the "database" for users, files, submissions, notifications, and activity logs

## Project Structure

```
├── index.html          # User portal entry point
├── admin.html           # Admin portal entry point
├── all.css              # Font Awesome stylesheet (icons)
├── css/
│   ├── user.css         # Styles for the user portal
│   └── admin.css        # Styles for the admin portal
├── js/
│   ├── user.js          # Logic for the user portal (also contains shared admin logic)
│   └── admin.js          # Logic for the admin portal (also contains shared user logic)
└── media/
    └── logo (1).png     # App logo used in both portals
```

> Note: `admin.html` and `index.html` reference `css/` and `js/` subfolders — make sure `admin.css`/`user.css` and `admin.js`/`user.js` are placed inside `css/` and `js/` directories (or update the `<link>`/`<script>` paths) for the pages to load correctly. `all.css` (Font Awesome) and the `media/` folder should sit alongside the HTML files.

## Getting Started

Because the app uses only static files and `localStorage`, no build tools or server-side setup are needed.

1. Place all files in the structure shown above.
2. Serve the folder with any static file server (recommended, so relative paths and `localStorage` behave consistently), e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```
3. Open `index.html` for the User Portal or `admin.html` for the Admin Portal in your browser.

## Demo Accounts

On first load, the app seeds itself with demo data (stored in `localStorage`), including these accounts:

| Role  | Email                        | Password |
|-------|------------------------------|----------|
| Admin | `admin@efile.com`            | `admin123` |
| User  | `john.olakunle@email.com`    | `user123`  |
| User  | `sarah.adebola@email.com`    | `user123`  |

Demo files, submissions, and activity entries are also seeded automatically the first time the app runs.

## Data Storage

All app data lives in the browser's `localStorage` under these keys:

| Key                     | Contents                                  |
|--------------------------|--------------------------------------------|
| `efile_users`            | User accounts (admins and standard users)  |
| `efile_files`             | Files dispatched by admins to users        |
| `efile_submissions`       | Files users submit back for review         |
| `efile_notifications`     | In-app notifications                       |
| `efile_activity`          | Audit log of actions (used by Tracking)    |
| `efile_session`           | Current logged-in session                  |

## Known Limitations

- **Client-side only**: there is no real backend, so data is local to a single browser/device and is not shared between users' real-world devices — it only appears "shared" here because both portals were built against the same demo `localStorage`.
- **Passwords are stored in plain text** in `localStorage` — this is a demo/prototype pattern, not suitable for production use.
- **No file size limits or real storage backend** — uploaded files are stored as base64 data URIs directly in `localStorage`, which has limited capacity (typically 5–10MB per origin).
- **No server-side validation or authentication** — all checks happen in the browser and can be bypassed via dev tools.

For a production deployment, this front end would need to be paired with a real backend (authentication, a database, and file storage) rather than `localStorage`.
# Lofi Video Directory - Blueprint

## Overview

This document outlines the plan and progress for creating a Next.js web application for discovering and curating Lofi YouTube videos. The app will feature user authentication, a voting system, and personal "favorites" lists, all built on a modern tech stack.

## Project Outline

### Core Functionality
- **Video Discovery:** Display a curated list of lofi videos from YouTube.
- **Video Player:** Embed the official YouTube player in an iframe.
- **User Authentication:** Login with Google or Email via Firebase Auth.
- **Favorites:** Logged-in users can save videos to a personal list.
- **Voting System:** Logged-in users can upvote videos to rank them.

### Tech Stack
- **Framework:** Next.js with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend:** Firebase (Authentication & Firestore)
- **Icons:** lucide-react

### Firestore Data Structure

- **Videos Collection:**
  - `videos/{documentId}`
    - `id`: string (YouTube video ID)
    - `title`: string
    - `channel`: string
    - `thumbnail`: string
    - `votes`: number
    - `favorites`: array of user UIDs

### UI Components
- **Header:** Contains the app logo, a search bar, and user profile/login button.
- **Filter Bar:** Buttons to switch between "Explore," "Top," and "My Favorites."
- **Video Card:** Displays video thumbnail, title, channel, and action buttons (Play, Favorite, Vote, View on YouTube).
- **Embedded Player:** A modal or sticky player that shows the YouTube iframe.

### Design & UX
- **Theme:** Modern, dark theme suitable for a "lofi" aesthetic.
- **Layout:** Clean, grid-based layout for video cards.
- **Responsiveness:** Fully responsive design for desktop and mobile.
- **Interactivity:** Smooth transitions and clear feedback for user actions (voting, favoriting).

## Current Plan

1.  **DONE** Set up the initial project structure and define the plan in this `blueprint.md`.
2.  **DONE** Add Firebase to the project configuration.
3.  **DONE** Install necessary dependencies: `firebase`, `lucide-react`, `dotenv`, `ts-node`.
4.  **DONE** Initialize `shadcn/ui` and add `card` and `button` components.
5.  **DONE** Create the Firebase configuration file (`src/lib/firebase.ts`) using environment variables.
6.  **DONE** Create a `.env.local` file for Firebase credentials.
7.  **DONE** Create a `seed.ts` script to populate the Firestore database.
8.  **DONE** Add a `seed` script to `package.json`.
9.  **DONE** Create initial UI components: `Header` and a placeholder `VideoCard`.
10. **DONE** Structure the main page (`src/app/page.tsx`) with a mock video list.
11. **DONE** Implement Firebase Authentication flow with `AuthContext`.
12. **Next:** Connect to Firestore to fetch and display video data on the main page.
13. **Next:** Implement the "favorite" and "vote" functionality using Server Actions.
14. **Next:** Create dynamic pages for "Top Voted" and "My Favorites."

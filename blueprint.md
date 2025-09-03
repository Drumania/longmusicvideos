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
  - `videos/{videoId}`
    - `title`: string
    - `channelTitle`: string
    - `thumbnailUrl`: string
    - `voteCount`: number

- **Users Collection:**
  - `users/{uid}`
    - `displayName`: string
    - `email`: string
    - `photoURL`: string
    - `favorites`: Subcollection -> `favorites/{videoId}`
      - `addedAt`: timestamp

- **Votes Subcollection (within Videos):**
  - `videos/{videoId}/votes/{uid}`
    - `votedAt`: timestamp

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
3.  **DONE** Install necessary dependencies: `firebase`, `lucide-react`.
4.  **DONE** Initialize `shadcn/ui` and add `card` and `button` components.
5.  **DONE** Create the Firebase configuration file (`src/lib/firebase.ts`).
6.  **DONE** Create initial UI components: `Header` and a placeholder `VideoCard`.
7.  **DONE** Structure the main page (`src/app/page.tsx`) with a mock video list.
8.  **Next:** Implement Firebase Authentication flow.
9.  **Next:** Connect to Firestore to fetch and display video data.
10. **Next:** Implement the "favorite" and "vote" functionality (Server Actions).



# Lofi Video Directory - Blueprint

## Overview

This application is a curated directory of lofi hip hop videos, designed for users to discover, vote for, and save their favorite tracks. It provides a simple and intuitive interface for exploring new music, seeing what's popular, and keeping a personal collection of favorites.

## Project Structure

The project follows the standard Next.js App Router structure.

-   `/src/app`: The core directory for file-based routing.
    -   `layout.tsx`: The root layout, which now includes the `AuthProvider`.
    -   `page.tsx`: The main "Explore" page, displaying all videos.
    -   `/favorites`:
        -   `page.tsx`: The "My Favorites" page, which shows videos the user has favorited.
    -   `/top-voted`:
        -   `page.tsx`: The "Top Voted" page, displaying the most popular videos.
-   `/src/components`: Contains reusable UI components.
    -   `Header.tsx`: The application header.
    -   `VideoCard.tsx`: The card component for displaying individual videos.
    -   `/ui`: Shadcn UI components.
-   `/src/context`:
    -   `AuthContext.tsx`: The authentication context, which manages user login and session.
-   `/src/lib`:
    -   `firebase.ts`: Firebase configuration and initialization.
-   `/public`: Static assets.
-   `blueprint.md`: This file, documenting the project.

## Design and Features

### Visual Design

-   **Theme:** Dark mode, with a modern and clean aesthetic.
-   **Color Palette:** Primarily uses shades of gray for the background, with white text and accent colors for buttons and interactive elements.
-   **Typography:** The `Geist` font family is used for a clean and modern look.
-   **Iconography:** `lucide-react` is used for icons, providing a consistent and lightweight set of visuals.
-   **Layout:** A responsive grid layout is used to display the video cards, adapting to different screen sizes.

### Features

-   **Video Directory:** The main page displays a list of lofi hip hop videos.
-   **Voting System:** Users can vote for their favorite videos. The vote count is updated in real-time.
-   **Favorites:** Users can save videos to their personal "Favorites" list.
-   **Top Voted:** A dedicated page showcases the most popular videos based on vote count.
-   **Authentication:** Users can log in with their Google account to save favorites.
-   **Server Actions:** Next.js Server Actions are used for handling mutations like voting and favoriting, providing a seamless and secure user experience.
-   **Firebase Integration:** Firestore is used as the database to store video information, votes, and user favorites.

## Changes Made to Fix the Routing Issue

1.  **Consolidated Routing:** All page files were moved from the `app` directory to the `src/app` directory to resolve the routing issue.
2.  **Added AuthProvider:** The `AuthProvider` was added to the root layout (`src/app/layout.tsx`) to provide the authentication context to all pages. This fixed the error that was occurring on the favorites page.
3.  **Cleaned Up Project:** The old, empty `app` directory was removed.


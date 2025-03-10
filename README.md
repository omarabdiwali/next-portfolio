# Interactive Portfolio

This project is a personal portfolio website built with React, Next.js, and features an interactive background animation based on Conway's Game of Life.

### **Website: https://omarabdiwali.vercel.app**

## Features

*   **Interactive Background:**  A dynamic and engaging Conway's Game of Life simulation running in the background.  You can interact with it!
*   **Responsive Design:** Adapts to different screen sizes (mobile, tablet, desktop) using a combination of CSS and JavaScript logic to adjust layout and animation parameters.
*   **Animated Text:**  Key sections of the site use a typewriter effect to reveal text, enhancing user engagement.
*   **Project Showcase:** Displays a section to highlight projects, separated into its component.
*   **Social Links:**  Provides easy access to GitHub, LinkedIn, and email.
*   **Smooth Scrolling Navigation**: Anchors link that bring user to the section of webpage they were located on
*   **Reduced Motion Support:**  Respects the user's `prefers-reduced-motion` setting, disabling animations if requested.
* **Custom Pause/Play and drawing**: Able to pause, draw new cells, and resume Game of Life Simulation

## Technologies Used

*   **Next.js:**  A React framework for server-side rendering and static site generation.
*   **React:**  A JavaScript library for building user interfaces.
*   **React Icons:**  Used for social media icons (AiOutlineGithub, AiFillLinkedin, MdEmail) and play/pause control (TbPlayerPauseFilled, TbPlayerPlayFilled).
*   **JavaScript:**  Core logic for the Game of Life, animations, responsiveness, and interactivity.
*   **HTML/CSS:**  Structure and styling.
*   **useCallback, useEffect, useRef, useState:** React Hooks for managing state, side effects, and DOM references.
* **mobilecheck**: funciton used to check for mobile devices.

## Project Structure

*   **`index.js`:** The main component (Home) containing the core logic for the website, including the Game of Life implementation, text animations, and navigation.
*   **`components/`:**
    *   `mobileCheck.js`: function used to check for mobile devices.
    *   `projectsSec.js`: projects and their styling.

## Code Overview (index.js)

The `index.js` file is the heart of the application.  Here's a breakdown of key parts:

1.  **Imports:**  Imports necessary React hooks, icons, components, and utility functions and modules.

2.  **Constants and State:**
    *   `cellSize`:  Defines the size of each cell in the Game of Life grid.
    *   `movement`:  An array representing the eight possible neighbor positions.
    *   `useState`:  Hooks to manage various states like text content, dimensions, animation status, and pause control.
    *   `useRef`:  Hooks to store persistent values like the Game of Life running state, and references to DOM elements (canvas, section refs).

3.  **Utility Functions:**
    *   `sleep`:  Pauses execution for a specified number of milliseconds (used for animations).
    *  `moveTo`: function used for window to scroll to page anchors
    *   `round`: Rounds a value to the nearest multiple, used for aligning to the grid.
    *   `mod`:  Calculates the modulo, handling negative numbers correctly for grid wrapping.
    *   `getRandom`:  Generates a random coordinate within the grid.
    *   `getAge`:  Calculates the age based on a hardcoded birth date.
    *   `animateText`:  Implements the typewriter effect by iteratively updating a state variable.

4.  **Game of Life Logic:**
    *   `generateStart`:  Creates the initial random pattern of cells.  It avoids placing cells in already occupied positions.
    *   `getNeighbours`:  Counts the live neighbors of a given cell, considering the grid boundaries.  Returns both the neighbor coordinates/status *and* the count.
    *   `gameOfLife`:  The core function that implements the Game of Life rules:
        *   Determines which cells live, die, or are born based on their neighbor counts.
        *   Updates the canvas using the 2D context API (`ctx.fillRect`, `ctx.clearRect`).
        *   Uses `setTimeout` to schedule the next generation, creating the animation.
        *   Uses a `useCallback` hook. This optimization avoids re-creating the function on every render, important since it's used in `setTimeout`.
        *   Checks for `prefers-reduced-motion`.
    *   `previousPosition`: A critical object. This is used *instead* of a 2D array to store the state of the Game of Life grid. This "sparse matrix" representation is much more efficient, as it only stores the coordinates of *live* cells, especially when displaying the webpage.

5.  **Event Handlers:**
    *   `startDrawing`: Toggles the Game of Life animation (play/pause).
    *   `changeLayout`:  Handles window resizing, updates grid dimensions, and switches between responsive layouts.  Uses `useCallback`.
    *   `getLocation`: used to determine position of user and highlight anchor link
    * `startDraw, endDraw, drawToCanvas`: Handles mousedown, mouseup, and mousemove eventsto allow users to add cells to the paused animation.

6.  **useEffect Hooks:**
    *   One `useEffect` starts the animation (calls `gameOfLife`) when `loaded` becomes true.  This delay ensures that the canvas is ready.
    * Other use Effects manage event listeners for "scroll", "resize", and "mousedown":
        *   Adds event listeners when the component mounts.
        *   *Removes* the listeners when the component unmounts (or when dependencies change), preventing memory leaks.
    *   One `useEffect` handles the initial text animation and sets up the initial state. This also calls `generateStart()`.

7.  **JSX Structure:**
    *   A canvas and its context are used to render the Game of Life grid.
    *   Conditional logic (using the states controlled by the useStates) using ternary statements is set to display and control the view different sections.
    *   Uses descriptive class names (likely combined with a CSS framework like Tailwind CSS, given the prefixes like `text-`, `bg-`, etc.).
    *   Uses `ref` attributes to connect the `projectRef`, `socialsRef` and `canvasRef` to their respective DOM elements.
    *  Play/Pause button is absolute positioned in the top right corner.
    * Absolute positioned anchor links for sections for movement to anchors.

# Interactive Developer Portfolio

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
* **mobileCheck**: funciton used to check for mobile devices.
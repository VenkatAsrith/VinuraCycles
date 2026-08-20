# Vinura Cycles — Premium Electric Bicycle Showcase

An industry-level, highly interactive, premium electric bicycle showcase landing page designed and developed for demonstration and practice purposes. Inspired by the award-winning creative interfaces of **[gionatannese.com](https://www.gionatannese.com/)** and high-end interactive product layouts.

## 🔗 Live Demo
* **Deployment Preview**: `https://vinuracycles.vercel.app` (Placeholder / Replace with active deploy URL)

---

## 🛠️ Tech Stack & Key Libraries

This project is built using a modern, fast, and strictly-typed frontend stack:

*   **Framework**: [React 18](https://react.dev/) + [Vite](https://vite.dev/) (Lightning-fast HMR and building pipeline)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict compiler settings with verbatim module check compliance)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first framework with custom animations)
*   **Animation Engines**:
    *   [GSAP (GreenSock)](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) (For high-precision, viewport-triggered, skewed text reveals and scroll indicators)
    *   [Framer Motion](https://www.framer.com/motion/) (For layoutId morphing, drag gestures, spring physics, and entrance transitions)
*   **Icons**: [Lucide React](https://lucide.dev/) (Clean SVG geometric icon library)

---

## ✨ Key Interactive Features

### 1. Brand Logo Shared-Layout FLIP Transition
Upon loader completion, the central `"VINURA CYCLES"` brand text morphs, translates, and scales down dynamically into the top-left corner of the header, becoming the Navbar Logo itself using Framer Motion `layoutId`.

### 2. Apple-Style Magnifying Floating Dock
A fixed bottom-center navigation dashboard using pointer capture coordinate tracking and spring damp constants to smoothly scale up icon sizes based on pointer distance, mimicking macOS desktop dock behavior.

### 3. Drag-Interactive Background Text Marquee
A giant watermarked outline text loop (`VINURA CYCLES CRUXON MODEL D • `) rendered behind the primary bike showcase. Users can click and swipe the marquee to accelerate, slow down, or reverse the scrolling track.

### 4. HTML5 Canvas Gravity Stars Background
A fixed-backdrop particle canvas attracting glowing stars to your cursor vector space using proximity constraints. Stars transition their flare colors dynamically matching the selected bike model's active color scheme.

### 5. Interactive Specifications Hotspots
Two specs pointer hotspot buttons overlay the main bicycle render. Hovering over a hotspot projects a luxury pointer arrow and slides open a description capsule describing components.

### 6. Polaroid Drag-Reviews Pinboard
Reviews are arranged as scattered Polaroid cards. Users can grab, slide, and arrange reviews anywhere inside the pinboard boundaries, with z-index ordering layers auto-incrementing on mouse down.

### 7. Interactive Snapshot Stack Deck
Four design snapshots are arranged in a rotation deck stack. Clicking the top card triggers a spring-damp transition, sending the card to the back of the stack.

### 8. Specs Tickers & 3D Spec Folders
*   **SpecTicker**: Automatically parses numeric values (e.g. `120 KM`, `18.4 KG`) and triggers counting animations from `0` when scrolled into view.
*   **3D spec folders**: Hovering over specs closer details flips open a 3D folder flap, letting the specs schematic image slide up in perspective space.

---

## 🚀 Getting Started Locally

Follow these steps to spin up the local development environment:

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/VenkatAsrith/VinuraCycles.git
    cd Bicycle
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Launch the Vite development server:
    ```bash
    npm run dev
    ```
    *Open `http://localhost:5173/` in your browser to inspect the application.*

4.  Build the production bundle:
    ```bash
    npm run build
    ```

---

## 🎨 Creative Credits & Disclaimer
*   **Design & Development**: Designed and Developed by **[VenkatAsrith](https://github.com/VenkatAsrith)**.
*   **Disclaimer**: This project is built for **practice and demonstration purposes only**. Asset graphics and mockup visual parameters belong to their respective creators.

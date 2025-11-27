# LumHarmony UI Redesign Specification

**Goal**: Create a "Beautiful, Atmospheric, Elegant" experience using **Glassmorphism**, **Dynamic Aurora Backgrounds**, and a **Linear Waterfall Layout**.

## 1. Visual & Design Tokens (Tailwind)

### 1.1 Atmosphere (The "Aurora" Background)
The background should feel alive, not static.
*   **Implementation**: Use 2-3 large, absolute-positioned, blurred circles (`blur-3xl`) that slowly drift.
*   **Colors**: Derived dynamically from the *Input Colors* (or default to soft pastels if empty).
*   **Tailwind Utility**: `absolute inset-0 -z-10 overflow-hidden bg-[#f8fafc]` (base).

### 1.2 Glassmorphism (The "Ice" Texture)
All UI elements (cards, inputs, bars) must float above the background.
*   **Surface**: `bg-white/40 backdrop-blur-xl` (Heavy blur for depth).
*   **Border**: `border border-white/50` (Crisp, thin, high-contrast light border).
*   **Shadow**: `shadow-2xl shadow-black/5` (Soft, diffuse shadow).
*   **Text**: `text-slate-800` (Primary), `text-slate-500` (Secondary/Label).

### 1.3 Typography
*   **Font**: `Inter` (Existing).
*   **Style**: Increase tracking (`tracking-wide`) for uppercase labels. Use lighter weights (`font-light`) for headings to look elegant.

---

## 2. Component Architecture & Flow

### 2.1 Phase 1: The "Hero" State (Empty)
*   **Layout**: Centered Flex/Grid.
*   **Component**: `HeroInput` (Large).
*   **Visual**: A single, inviting input bar. "What is your color inspiration?"
*   **No distractions**: Hide Scene Selector, Output, Analysis.

### 2.2 Phase 2: The "Active" State (Content)
*   **Layout**:
    *   **Top Bar**: The `HeroInput` morphs (via `layoutId`) into a compact header bar.
    *   **Sticky Nav**: `SceneSelector` appears below the header as a horizontal "Pill" list.
    *   **Main Content**: A **Masonry/Grid Waterfall** of color results.

### 2.3 Component Refactoring Plan

#### A. `AmbientBackground.tsx` (New)
*   **Responsibility**: Renders the moving gradients.
*   **Props**: `{ primaryColors: string[] }`.

#### B. `InputBar.tsx` (Refactor `ColorInput`)
*   **Responsibility**: Handles input.
*   **Animation**: Uses `framer-motion` `layout` prop to animate between "Centered Hero" (large) and "Top Compact" (small).

#### C. `SceneTabs.tsx` (Refactor `SceneSelector`)
*   **Old**: Vertical list.
*   **New**: Horizontal scrollable row of "Pills/Tabs".
*   **Style**:
    *   Active: `bg-white text-black shadow-md`.
    *   Inactive: `bg-transparent text-black/60 hover:bg-white/20`.

#### D. `ResultWaterfall.tsx` (New - Merges `OutputPanel` + `ColorList`)
*   **Structure**: A CSS Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
*   **Items**:
    *   **Input Color Cards**: Show original input.
    *   **Generated Palette Cards**: Large swatches of the result.
    *   **Analysis Widget**: A small, floating "Health Status" pill, not a giant error box.

---

## 3. Animation Strategy (Framer Motion)

### 3.1 Dependencies
`npm install framer-motion`

### 3.2 Transitions
*   **Entrance**: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` with `staggerChildren`.
*   **Hero to Header**: Wrap the input container in `<motion.div layoutId="input-container">`. This automatically tweens the position and size when the state changes from "Empty" to "Has Content".

---

## 4. Step-by-Step Implementation Checklist

1.  **Setup**: Install `framer-motion`.
2.  **CSS**: Add `.glass` utility class in `index.css` for reusability.
    ```css
    .glass {
      @apply bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl shadow-black/5;
    }
    ```
3.  **Refactor `App.tsx`**:
    *   Extract the layout into a wrapper.
    *   Add `<AmbientBackground />` at the root.
    *   Conditional rendering: `{ !hasContent ? <HeroLayout /> : <MainLayout /> }`.
4.  **Build `SceneTabs`**: Convert vertical buttons to horizontal pills.
5.  **Build `ResultWaterfall`**: Create the card grid.
6.  **Polish**: Add hover effects (`hover:scale-[1.02]`) to color cards.

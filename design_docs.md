# LumHarmony Design & Enhancement Plan

## 1. Bug Analysis: APCA Score/Rating Reversal

**Issue:** User reported that APCA Score and Rating are "reversed".
**Diagnosis:**
- In `src/lib/color-utils.ts`, the `light` scene is defined with `reference: 'black'`.
- APCA calculation is `calcAPCA(textColor, bgColor)`.
- Currently, it calculates contrast against Black.
- For "Light Mode", the background should typically be White (or light).
- By referencing Black, the algorithm optimizes for **Light Text** (high contrast against black).
- User expectation for "Light Mode" is **Dark Text** (on light background).
- **Result:** The logic is inverted. The tool produces light colors instead of dark colors for Light Mode.

**Fix:**
- Change `SCENES.light` reference from `'black'` to `'white'`.
- Ensure `SCENES.contrast` is also correct (currently `'white'`, which implies Dark Text on White BG).

## 2. Feature: Primary Background Color Selection

**Requirement:** User wants to specify a custom "Primary Color" (Background) for contrast calculations, replacing the hardcoded Black/White defaults.

**Design:**
- **State**: Add `primaryColor` (string, hex) to `App.tsx`. Default to `#ffffff`.
- **UI**: Add a Color Picker and Hex Input in the `InputSection` (right panel).
- **Logic**:
    - Update `adjustColorsToScene` in `color-utils.ts` to accept an optional `referenceColor`.
    - If provided, use this color instead of the Scene's default `reference` ('black'/'white').
    - Recalculate APCA targets based on this new background.

## 3. UI Layout Improvements

**Requirement:** `InputSection` "Target Scene" selector is too narrow.
**Solution:**
- Change `InputSection` layout from fixed `300px` sidebar to a proportional flex/grid layout.
- **Proposed Grid**: `grid-cols-[1.5fr_1fr]` (60% Input, 40% Controls).
- Make it responsive (stack on mobile).

## 4. Internationalization (i18n)

**Requirement:** Support Chinese language.
**Design:**
- **State**: Add `language` ('en' | 'zh') to `App.tsx`.
- **Storage**: Simple dictionary object in `src/lib/i18n.ts`.
- **UI**: Add a Language Switcher (Button/Dropdown) in the top-right of `InputSection`.
- **Scope**: Translate Scene names, descriptions, Table headers, and Status messages.

## 5. Architecture & State Updates

**Updated State in `App.tsx`:**
```typescript
const [primaryColor, setPrimaryColor] = useState<string>('#ffffff');
const [language, setLanguage] = useState<'en' | 'zh'>('zh'); // Default to Chinese as requested
```

**Component Hierarchy Updates:**
- `InputSection`
    - Props: `primaryColor`, `onPrimaryColorChange`, `language`, `onLanguageChange`
    - New Sub-components: `ColorPicker`, `LanguageSwitcher`
- `ColorTable`
    - Props: `language`, `primaryColor` (passed down for Row rendering context if needed)
    - Update headers to use translation.
- `StatusBar`
    - Props: `language`

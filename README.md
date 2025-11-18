# BOILERPLATE

A Next.js boilerplate with modular architecture and strict conventions.

## 🚀 Getting Started

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Architecture

### Components
- **`features/`**: Page-specific components
- **`components/ui/`**: Reusable components (Button, Icons, etc.)
- **`components/layout/`**: Layout components (Header, Footer)
- **`components/shared/`**: Components shared between features

### Hooks
- **`hooks/`**: Reusable business logic (performance, scroll, animations, etc.)

### Layout
- **`layout/`**: Specific layouts (default.tsx)

### Providers
- **`providers/`**: Global contexts
  - `performance.provider.tsx`: Performance management
  - `smooth-scroll.provider.tsx`: Smooth scroll
  - `root.tsx`: Root provider

## 🎨 Styles

### Tailwind CSS
- **CSS Variables**: `styles/tailwind.css`
- **Global Spacing**: Variables `--x-default`, `--y-default` with variants (half, double)
- **Padding/Margin**: `padding-x-default`, `margin-y-double-default`, etc.
- **Colors and fonts**: Declared in `:root` and `@theme`

### SCSS
- **`styles/abstracts/`**: Mixins and keyframes
- **`styles/base/`**: Reset, fonts, Lenis
- **`styles/components/`**: Typography and components
- **`styles/main.scss`**: Main entry point

### Conventions
- **Typography**: Classes `.h1`, `.h2`, `.h3`, `.p1`, `.p2`, `.p3` in `_typography.scss`
- **Fonts**: Font declarations in `_fonts.scss`
- **Global Variables**: SCSS for typography, Tailwind for spacing
- **Mixins**: `_mixins.scss`
- **Animations**: `_keyframes.scss`

## ⚙️ Configuration

### ESLint + Prettier
```bash
yarn format    # Format code
yarn check     # Check without fixing
yarn lint      # Linter
```

### VS Code
- Automatic formatting with ESLint
- Prettier for CSS property ordering
- Husky for Git hooks

## 🛠️ Scripts

```bash
yarn dev       # Development with Turbopack
yarn build     # Production build
yarn start     # Production server
yarn format    # Format with ESLint
yarn check     # Check code
```

## 📦 Dependencies

- **Next.js 15** with Pages Router
- **React 19** + TypeScript
- **GSAP** for animations
- **Lenis** for smooth scroll
- **Tailwind CSS 4** + SCSS
- **ESLint** + Prettier for code quality
# CRYSTAL-VISION

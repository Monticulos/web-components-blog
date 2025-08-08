# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a vanilla HTML/CSS/JavaScript project with no build process or package manager. To develop:

- Open `index.html` directly in a browser or serve via a local HTTP server
- No installation, build, or test commands are needed

## Architecture

This is a blog application built with **Web Components** using vanilla JavaScript:

### Component Structure
- **Custom Elements**: All components are defined as Web Components in `/components/`
- **Shadow DOM**: Each component uses Shadow DOM with `mode: "open"`
- **Global Styles**: Components link to `/global.css` within their shadow DOM

### Key Components
- `blog-header`: Navigation and site header
- `blog-entry`: Displays individual blog posts
- `blog-main`: Main content area (placeholder content)
- `blog-archive`: Archive/listing functionality
- `blog-theme-switch`: Theme toggle functionality

### Content Management
- **Blog Entries**: Stored as JavaScript modules in `/entries/` directory
- **Entry Format**: Each entry exports a default object with `title`, `publishedDate`, `bodyText`, `tags`, etc.
- **Dynamic Loading**: `BlogEntry.js` imports and renders entries dynamically

### Theme System
- **Theme Utility**: `/utils/Theme.js` manages light/dark theme persistence via localStorage
- **Theme Constants**: `/constants/themes.js` defines available themes
- **Theme Icons**: SVG icons stored as JavaScript modules in `/icons/`

### File Organization
```
components/     - Web Component definitions
entries/        - Blog post content as JS modules  
utils/          - Utility classes (Theme management)
constants/      - Shared constants
icons/          - SVG icons as JS modules
```

The application uses ES modules with static imports. New blog entries should follow the existing format in `/entries/` and be imported into the appropriate component.

## Code Style

This codebase follows a pattern of using **small helper functions** to improve readability and reduce duplication. When writing or refactoring components:

- Extract logic into descriptive helper functions (e.g., `getEntryFromHash()`, `getEntry()`)
- Use helper functions to eliminate repetitive code patterns
- Keep helper functions focused on single responsibilities
- Place helper functions at the top of files before the main component class
- All text shown to the user should be in Norwegian
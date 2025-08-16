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
- `blog-archive`: Archive/listing functionality
- `blog-theme-toggle`: Theme toggle functionality
- `blog-tags`: Tag management and display
- `entry-navigation`: Navigation between blog entries

### Content Management
- **Blog Entries**: Stored as JavaScript modules in `/entries/` directory
- **Entry Format**: Each entry exports a default object with `title`, `publishedDate`, `bodyText`, `tags`, etc.
- **Entry Manager**: `EntryManager.js` utility class handles entry loading and management
- **Entry Index**: `entries/index.js` provides centralized entry imports
- **Dynamic Loading**: `BlogEntry.js` imports and renders entries based on URL

### Theme System
- **Theme Utility**: `/utils/Theme.js` manages light/dark theme persistence via localStorage
- **Theme Constants**: `/constants/themes.js` defines available themes
- **Theme Icons**: SVG icons stored as JavaScript modules in `/icons/` (sun, moon, pencil line)

### File Organization
```
components/     - Web Component definitions (organized in directories)
├── BlogArchive/        - BlogArchive.js + BlogArchiveStyles.js
├── BlogEntry/          - BlogEntry.js + BlogEntryStyles.js  
├── BlogHeader/         - BlogHeader.js + BlogHeaderStyles.js
├── BlogTags/           - BlogTags.js + BlogTagsStyles.js
├── BlogThemeToggle/    - BlogThemeToggle.js + BlogThemeToggleStyles.js
├── EntryNavigation/    - EntryNavigation.js + EntryNavigationStyles.js
└── BaseComponent.js    - Base class for all components

entries/        - Blog post content as JS modules + index
utils/          - Utility classes (Theme, EntryManager)
constants/      - Shared constants (themes)
icons/          - SVG icons as JS modules
archive.html    - Archive page template
index.html      - Main application entry point
global.css      - Global styles
```

### Component Architecture
- **Directory Structure**: Each component has its own directory containing the main component file and a separate styles file
- **Style Separation**: Styles are extracted to `ComponentNameStyles.js` files that export template literals
- **Import Pattern**: Components import styles with `import { styles } from './ComponentNameStyles.js'`

The application uses ES modules with static imports. New blog entries should follow the existing format in `/entries/` and be imported into the appropriate component.

## Code Style

When writing or refactoring components:
- Follow the single responsibility principle
- Follow the DRY principle
- All text shown to the user should be in Norwegian
- Keep functions/methods short
import { BlogArchive } from "./BlogArchive.js";
import { BlogEntry } from "./BlogEntry.js";
import { BlogHeader } from "./BlogHeader.js"
import { BlogThemeToggle } from "./BlogThemeToggle.js";

customElements.define("blog-header", BlogHeader);
customElements.define("blog-archive", BlogArchive);
customElements.define("blog-theme-switch", BlogThemeToggle);
customElements.define("blog-entry", BlogEntry);
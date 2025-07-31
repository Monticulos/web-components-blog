import { BlogArchive } from "./blog-archive.js";
import { BlogHeader } from "./blog-header.js"
import { BlogMain } from "./blog-main.js";
import { BlogThemeSwitch } from "./blog-theme-switch.js";

customElements.define("blog-header", BlogHeader);
customElements.define("blog-main", BlogMain);
customElements.define("blog-archive", BlogArchive);
customElements.define("blog-theme-switch", BlogThemeSwitch);
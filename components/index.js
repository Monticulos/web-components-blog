import { BlogArchive } from "./blog-archive.js";
import { BlogHeader } from "./blog-header.js"
import { BlogMain } from "./blog-main.js";
import { BlogNav } from "./blog-navigation.js";

customElements.define("blog-header", BlogHeader);
customElements.define("blog-main", BlogMain);
customElements.define("blog-navigation", BlogNav);
customElements.define("blog-archive", BlogArchive);
import { BlogArchive } from "./blog-archive.js";
import { BlogHeader } from "./blog-header.js"
import { BlogMain } from "./blog-main.js";

customElements.define("blog-header", BlogHeader);
customElements.define("blog-main", BlogMain);
customElements.define("blog-archive", BlogArchive);
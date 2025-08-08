import entry from "../entries/2025-08-08.js";

export class BlogEntry extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <link rel="stylesheet" href="/global.css" />
        <main>
            <h1>${entry.title}</h1>
            <p>${entry.publishedDate}</p>
            <div>${entry.bodyText}</div>
        </main>
        `;
    }
}
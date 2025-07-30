export class BlogMain extends HTMLElement {
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <style>
            main {
                padding-inline: 3rem;
                padding-block: 0.25rem;
            }
        </style>
        
        <main>
            <h1>Welcome to my blog!</h1>
        </main>
        `;
    }
}
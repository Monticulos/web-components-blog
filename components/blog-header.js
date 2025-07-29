class BlogHeader extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
        <style>     
            @import url('./blog-header.css');
        </style>
        <header>
            <h1>The Blog</h1>
        </header>
        `;
    }
}

customElements.define("blog-header", BlogHeader);
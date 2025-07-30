export class BlogArchive extends HTMLElement {
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <link rel="stylesheet" href="/global.css" />
        <style>
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }

            li {
                margin-bottom: 1rem;
            }
        </style>
        <main>
            <h1>Arkiv</h1>
            <ul>
                <li><a href="#">3. januar 2025 - Etikk og moral</a></li>
                <li><a href="#">8. januar 2025 - Logikk og resonnering</a></li>
                <li><a href="#">12. januar 2025 - Metafysikk</a></li>
                <li><a href="#">15. januar 2025 - Politisk filosofi</a></li>
                <li><a href="#">20. januar 2025 - Eksistensialisme</a></li>
                <li><a href="#">23. januar 2025 - Språkfilosofi</a></li>
                <li><a href="#">28. januar 2025 - Vitenskapsfilosofi</a></li>
                <li><a href="#">2. februar 2025 - Estetikk og kunstfilosofi</a></li>
                <li><a href="#">7. februar 2025 - Bevissthetsfilosofi</a></li>
                <li><a href="#">12. februar 2025 - Religionsfilosofi</a></li>
                <li><a href="#">18. februar 2025 - Sosialfilosofi</a></li>
                <li><a href="#">25. februar 2025 - Fenomenologi</a></li>
                <li><a href="#">3. mars 2025 - Filosofisk antropologi</a></li>
            </ul>
        </main>
        `;
    }
}

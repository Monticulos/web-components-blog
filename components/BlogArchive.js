export class BlogArchive extends HTMLElement {
    connectedCallback() {
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
                <li><a href="#"><b>Etikk og moral</b><br />3. januar 2025</a></li>
                <li><a href="#"><b>Logikk og resonnering</b><br />8. januar 2025</a></li>
                <li><a href="#"><b>Metafysikk</b><br />12. januar 2025</a></li>
                <li><a href="#"><b>Politisk filosofi</b><br />15. januar 2025</a></li>
                <li><a href="#"><b>Eksistensialisme</b><br />20. januar 2025</a></li>
                <li><a href="#"><b>Språkfilosofi</b><br />23. januar 2025</a></li>
                <li><a href="#"><b>Vitenskapsfilosofi</b><br />28. januar 2025</a></li>
                <li><a href="#"><b>Estetikk og kunstfilosofi</b><br />2. februar 2025</a></li>
                <li><a href="#"><b>Bevissthetsfilosofi</b><br />7. februar 2025</a></li>
                <li><a href="#"><b>Religionsfilosofi</b><br />12. februar 2025</a></li>
                <li><a href="#"><b>Sosialfilosofi</b><br />18. februar 2025</a></li>
                <li><a href="#"><b>Fenomenologi</b><br />25. februar 2025</a></li>
                <li><a href="#"><b>Filosofisk antropologi</b><br />3. mars 2025</a></li>
            </ul>
        </main>
        `;
    }
}

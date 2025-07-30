export class BlogNav extends HTMLElement {
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <link rel="stylesheet" href="/global.css" />
        <style>
            nav {
                height: 100%;
                padding-inline: 1rem;
                padding-block: 1rem;
            }

            h1 {
                font-size: 1rem;
            }

            a {
                font-size: 1rem;
            }

            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }
        </style>
        <nav>
            <h1>Latest entries</h1>
                <ul>
                    <li><a href="#">She is</a></li>
                    <li><a href="#">Over My Head</a></li>
                    <li><a href="#">How to Save a Life</a></li>
                    <li><a href="#">All at Once</a></li>
                    <li><a href="#">Fall Away</a></li>
                    <li><a href="#">Heaven Forbid</a></li>
                </ul>
        </nav>
        `;
    }
}
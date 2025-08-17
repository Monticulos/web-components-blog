export const styles = /*css*/`
    nav {
        margin-top: 2rem;
        border-top: 1px solid var(--border-color);
        padding-top: 1rem;
        text-align: center;
    }

    a {
        font-style: italic;
        font-size: 85%;
    }

    a:after {
        content: "|";
        padding-inline: 0.5rem;
    }

    a:last-child:after {
        content: "";
    }
`
const resetButtonProperties = /*css*/`
    button {
        background: none;
        color: inherit;
        border: none;
        font-size: inherit;
        font-family: inherit;
    }
`

export const styles = /*css*/`
    ${resetButtonProperties}

    button {
        display: flex;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }

    button:hover {
        background-color: var(--hover-color);
        cursor: pointer;
    }
`


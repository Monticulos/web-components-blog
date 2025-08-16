const resetButtonProperties = `
    background: none;
    color: inherit;
    border: none;
    font-size: inherit;
    font-family: inherit;
`

export const styles = `
    button {
        display: flex;
        border-radius: 0.5rem;
        padding: 0.5rem;
        ${resetButtonProperties}
    }

    button:hover {
        background-color: var(--hover-color);
        cursor: pointer;
    }
`


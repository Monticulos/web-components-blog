const title = "Shadow DOM og innkapsling"

const bodyText = `
<p>En av de største fordelene med Web Components er Shadow DOM. Det gir oss ekte CSS-innkapsling som vi lenge har savnet på web-plattformen. Hver komponent kan ha sine egne stiler uten å bekymre seg for konflikter med resten av siden.</p>

<p>Shadow DOM skaper en egen DOM-skog som er isolert fra hoveddokumentet. Dette betyr at CSS-selektorer ikke lekker inn eller ut, og JavaScript må eksplisitt krysse grensen mellom lys og skygge. Det er en elegant løsning på mange av problemene vi har prøvd å løse med metodologier som BEM eller CSS-in-JS.</p>
`

export default {
    title,
    publishedDate: "7. august 2025",
    publishedTime: "09.15",
    lastUpdatedDate: "",
    lastUpdatedTime: "",
    slugs: ["shadow-dom-innkapsling", "shadow-dom"],
    tags: ["KI-generert"],
    bodyText
}
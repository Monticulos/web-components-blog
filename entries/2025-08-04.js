const title = "Reaktivitet uten rammeverk"

const bodyText = `
<p>En av de største utfordringene ved å droppe React er å håndtere tilstandsendringer og reaktivitet. React gjorde dette enkelt med sin virtuelle DOM og komponentens livssyklus. Men hvordan løser vi dette med bare vanilla JavaScript?</p>

<p>Web Components har <code>attributeChangedCallback</code> som lar oss reagere på endringer i attributter. Vi kan også bruke observere og events for å skape reaktive systemer. Det krever mer tankearbeid, men gir også mer kontroll over når og hvordan oppdateringer skjer. Ingen mystiske re-renders eller uventede optimaliseringer.</p>
`

export default {
    title,
    publishedDate: "4. august 2025",
    publishedTime: "13.10",
    lastUpdatedDate: "",
    lastUpdatedTime: "",
    slugs: ["reaktivitet-uten-rammeverk", "reaktivitet"],
    tags: ["KI-generert"],
    bodyText
}
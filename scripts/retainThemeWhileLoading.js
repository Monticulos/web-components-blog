/**
 * Prevents flashes with wrong background color when loading page
 */ 
(function retainThemeWhileLoading() {
    const storedPreference = localStorage.getItem("theme-preference");
    if (storedPreference) {
        document.body.classList.add(storedPreference);
    } else {
        const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const themePreference = hasDarkPreference ? "dark" : "light";
        document.body.classList.add(themePreference);
    }
}());
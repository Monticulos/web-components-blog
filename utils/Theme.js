import { themes } from "../constants/themes.js";

export class Theme {
    static get() {
        return localStorage.getItem('theme-preference') ?? this.getMediaQueryColorScheme();
    }

    static set(theme) {
        return localStorage.setItem('theme-preference', theme);
    }

    static switch() {
        this.switchStored();
        this.enableTransition();
        this.updateClassList();
    }

    static switchStored() {
        const newTheme = this.isLight() ? themes.dark : themes.light;
        this.set(newTheme);
    }

    static enableTransition() {
        document.body.classList.add("transition");
        addEventListener("transitionend", () => {
            document.body.classList.remove("transition")
        }, { once: true });
    }

    static updateClassList() {
        document.body.classList.toggle(themes.light, this.isLight());
        document.body.classList.toggle(themes.dark, !this.isLight());
    }

    static isLight() {
        const currentTheme = Theme.get();
        return currentTheme === themes.light;
    }

    static getMediaQueryColorScheme() {
        const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return hasDarkPreference ? themes.dark : themes.light;
    }
}
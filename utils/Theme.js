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
        this.updateClassList();
    }

    static switchStored() {
        const newTheme = this.isLight() ? themes.dark : themes.light;
        this.set(newTheme);
    }

    static updateClassList() {
        if (this.isLight()) {
            document.body.classList.add(themes.light);
            document.body.classList.remove(themes.dark);
        } else {
            document.body.classList.add(themes.dark);
            document.body.classList.remove(themes.light);
        }
    }

    static isLight() {
        const currentTheme = Theme.get();
        return currentTheme === themes.light;
    }

    static getMediaQueryColorScheme() {
        const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)");
        return hasDarkPreference ? themes.dark : themes.light;
    }
}
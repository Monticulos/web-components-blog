import { themes } from "../constants/themes.js";

export class Theme {
    static get() {
        return localStorage.getItem('theme-preference') ?? themes.light;
    }

    static set(theme) {
        return localStorage.setItem('theme-preference', theme);
    }

    static toggle() {
        const newTheme = Theme.isLight() ? themes.dark : themes.light;
        this.set(newTheme);
        return newTheme;
    }

    static isLight() {
        const currentTheme = Theme.get();
        return currentTheme === themes.light;
    }
}
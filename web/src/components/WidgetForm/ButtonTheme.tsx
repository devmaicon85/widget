import { Moon, SunDim } from "phosphor-react";
import { useEffect, useState } from "react";

export function Theme() {
    const [isThemeDark, setIsThemeDark] = useState(checkCurrentThemeIsDark());

    useEffect(() => {
        loadThemeCurrent();
    }, []);

    function handleSetTheme() {
        isThemeDark ? setThemeLightStorage() : setThemeDarkStorage();
        setIsThemeDark(!isThemeDark);
    }

    return (
        <span className="text-2xl absolute bottom-2 right-5 text-gray-400">
            <a href="#" onClick={handleSetTheme}>
                {isThemeDark ? (
                    <SunDim alt="Alterar para tema Light"></SunDim>
                ) : (
                    <Moon alt="Alterar para tema Dark"></Moon>
                )}
            </a>
        </span>
    );
}

function themeSystemIsDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false;
}

function hasThemeLocalStorage() {
    return "theme" in localStorage;
}

function setThemeDarkStorage() {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
}

function setThemeLightStorage() {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
}

function checkCurrentThemeIsDark() {
    if (hasThemeLocalStorage()) {
        return localStorage.theme === "dark" ?? false;
    }

    return themeSystemIsDark() ?? false;
}

function loadThemeCurrent() {
    checkCurrentThemeIsDark()
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
}

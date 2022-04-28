export function getLocal (key: string) {
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch {
        return window.localStorage.getItem(key)
    }
}

export function setLocal (key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocal (key: string) {
    window.localStorage.removeItem(key)
}
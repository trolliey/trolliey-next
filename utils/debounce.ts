export default function debounce(limit: number | undefined, callback: (args_0: any[]) => void) {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(callback, limit, args)
    }
}

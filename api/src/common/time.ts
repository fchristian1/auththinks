export const getUnixDate = (): string => {
    return Math.floor(Date.now() / 1000).toString();
}
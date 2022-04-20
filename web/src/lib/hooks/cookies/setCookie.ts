import Cookies from 'universal-cookie'

export const setCookie = (
    key: string,
    value: string,
    path: string = '/',
    maxAge: number = 3600
) => {
    const cookie = new Cookies()

    cookie.set(key, value, { path: path, maxAge: maxAge })
}

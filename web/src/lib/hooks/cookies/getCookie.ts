import Cookies from 'universal-cookie'

export const getCookie = (key: string) => {
    const cookie = new Cookies()

    return cookie.get(key)
}

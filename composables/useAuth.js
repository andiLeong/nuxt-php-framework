export function useAuth() {
    function setUser(user) {
        if (process.client) {
            localStorage.setItem("user", JSON.stringify(user))
        }
        useState('user', () => user)
    }

    function getUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

    function removeUser() {
        localStorage.removeItem('user')
    }

    const isLoggedIn = computed(() => {
        if (process.client) {
            return !!localStorage.getItem('user')
        }
    })

    return {setUser, getUser, removeUser, isLoggedIn}
}
export function useHandleTokenExpired() {

    const {removeUser} = useAuth()

    function redirectToLogin(status) {
        if (status === 401) {
            removeUser()
            window.location.pathname = '/login'
        }
    }

    return {redirectToLogin}
}
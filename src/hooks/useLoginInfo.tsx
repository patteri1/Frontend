import { useEffect, useState } from 'react'

/**Tässä tarkistetaan onko käyttäjä admin */
export const useLoginInfo = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const authInfo = JSON.parse(
        window.localStorage.getItem('AuthPayload') || ''
    )
    useEffect(() => {
        if (authInfo.user.userRole.userRoleId === 1) {
            setIsAdmin(true)
        }
    }, [])

    return isAdmin
}

import { useEffect, useState } from 'react'

/**Tässä tarkistetaan käytettävän laitteen koko, jotta voidaan määrittää miltä sovellus näyttää mobiiliversiona */
export const useMobileScreen = () => {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        if (window.innerWidth <= 500) {
            setIsMobile(true)
        }
    }, [])

    return isMobile
}

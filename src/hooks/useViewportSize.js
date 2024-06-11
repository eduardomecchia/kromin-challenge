import { useState, useEffect } from 'react'

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// This also works: '-webkit-fill-available; max-height: fill-available'
export const useViewportSize = () => {
    const [viewportSize, setViewportSize] = useState({
        width: undefined,
        height: undefined,
    })
    const handleResize = () => {
        setViewportSize({
            vw: window.innerWidth * 0.01,
            vh: window.innerHeight * 0.01,
        })
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return viewportSize
}

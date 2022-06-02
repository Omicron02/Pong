import { useEffect, useRef } from 'react'

export function useKeyPress(target, event) 
{
    useEffect(() => 
    {
        const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true)
        const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false)
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        return () => 
        {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])
}

export function useControls() 
{
    const keys = useRef({ p1up: false, p1down: false, p2up: false, p2down: false, reset: false })
    useKeyPress(['w'], (pressed) => (keys.current.p1up = pressed))
    useKeyPress(['s'], (pressed) => (keys.current.p1down = pressed))
    useKeyPress(['ArrowUp'], (pressed) => (keys.current.p2up = pressed))
    useKeyPress(['ArrowDown'], (pressed) => (keys.current.p2down = pressed))
    useKeyPress(['r'], (pressed) => (keys.current.reset = pressed))
    return keys
}

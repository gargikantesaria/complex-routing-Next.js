'use client'
import { useState, useEffect } from 'react'

const DynamicContent = () => {
    const [timestamp, setTimestamp] = useState('')

    useEffect(() => {
        setTimestamp(new Date().toLocaleString())
    }, [])

    return <div>{timestamp}</div>
}

// For server components, ensure consistent output
const StaticContent = () => {
    // Use static values or pass them as props from the server
    return <div>{/* static content */}</div>
} 
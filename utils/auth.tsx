import React, { createContext, useEffect, useState } from "react"

function useAuth() {
    const [authSuccess, setAuthSuccess] = useState(false)
    const [authError, setAuthError] = useState<{
        a?: any,
        code: string
        message: string
        //@ts-ignore
    }>(null)
    const [authLoading, setAuthLoading] = useState(null)

    return (
        <div>auth</div>
    )
}

export default useAuth
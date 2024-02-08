// import React from 'react'
// import { useAuthStore } from '../store'
// import { Navigate } from 'react-router-dom'

// const Protected = ({ children }: { children: React.ReactNode }) => {
//     const { authenticated } = useAuthStore()
//     if (!authenticated) {
//         return <Navigate to={"/auth/login"} replace={true} />
//     }
//     return <>{children}</>
// }

// export default Protected

import { useAuthStore } from '../store'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    const { authenticated } = useAuthStore()
    if (!authenticated) {
        return <Navigate to={"/auth/login"} replace={true} />
    }
    return <Outlet />
}

export default Protected
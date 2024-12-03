import { Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'

const PrivateRouteLanding = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    const [userRole, setUserRole] = useState() 

    useEffect(() => {
        if (token) {
            const decode = jwtDecode(token)
            const role = decode.role
            setUserRole(role)
        }
    }, [token])
    

    return (
        token ? window.location.href = `/${userRole}Home` : <Outlet />
    )
}

export default PrivateRouteLanding
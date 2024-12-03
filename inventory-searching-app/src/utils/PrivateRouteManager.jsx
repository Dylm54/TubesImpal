import { Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const PrivateRouteManager = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]

    const decode = () => {
        if (token) {
            return jwtDecode(token)
        } else {
            return;
        }
    }

    return (
        decode()?.role === 'manager' ? <Outlet /> : window.location.href = '/'
    )
}

export default PrivateRouteManager
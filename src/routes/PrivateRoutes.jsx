import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

 const PrivateRoutes = ({children}) => {
const {user} = useAuth()
console.log(user)

if (!user) {
    return <Navigate to="/signup" replace={true}/>
}

return children
}

export default PrivateRoutes
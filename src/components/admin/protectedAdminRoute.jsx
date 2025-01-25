import { Navigate } from "react-router-dom"

const ProtectedAdminRoute = ({isAllowed, redirectTo, children}) => {
    
    if(!isAllowed){
        <Navigate to={redirectTo}/>
    }
  return children
}
export default ProtectedAdminRoute
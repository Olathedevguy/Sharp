import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BackButton = () => {

    const navigate = useNavigate()
  return (
    <button onClick={()=>navigate(-1)} className="bg-transparent text-gray-800 px-4 py-2 rounded-md  hover:bg-gray-200 transition duration-300 flex items-center gap-2 mt-4 ml-4"><ArrowLeft />Back</button>
  )
}
export default BackButton
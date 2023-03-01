import { useNavigate } from "react-router-dom";


const Alert = ({ type, text, link }) => {

const navigate = useNavigate();

const validLink = (link) ? link : '#';
return (
    <div
      role="alert" 
      onClick={()=> navigate(validLink)}
      className={`py-3 alert 
      ${!text && "d-none"} ${
        type === "error"
          ? "alert-danger"
          : type === "info"
          ? "alert-info"
          : type === "warning"
          ? "alert-warning"
          : "alert-secondary"
      }`}
    >
    {text}
    </div>
  )
    }
  export default Alert;
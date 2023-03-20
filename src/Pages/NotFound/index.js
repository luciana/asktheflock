//import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/Images/logos/Ask-The-Flock-logo_transparent-smaller.png';


const NotFound = () => {
   

  return (
    <div className="App  container bg-white mx-auto">   
      <div className="flex h-screen justify-center items-center">
        <img src={logo} className="img-fluid" alt="Ask The Flock" />       
        <h1 className="text-3xl text-primary">Oops Page Not Found!</h1>
        
      </div>
    </div>
    )}
  ;
  
  export default NotFound;
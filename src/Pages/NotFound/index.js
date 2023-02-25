import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/Images/logos/Flock-App-logos_black.png';


const NotFound = () => {
   

  return (
    <div className="App  container bg-white mx-auto">   
      <div className="flex h-screen justify-center items-center">
        <h1 className="text-3xl text-primary">Oops Page Not Found!</h1>
        <img src={logo} className="img-fluid" alt="Flock App" />        
      </div>
    </div>
    )}
  ;
  
  export default NotFound;
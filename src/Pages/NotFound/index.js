//import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/Images/logos/Ask-The-Flock-square-blue-smaller.png';


const NotFound = () => {
   

  return (
    <div className="App  container bg-white mx-auto">   
      <div className="flex h-screen justify-center items-center">
       <a href="/">
        <img src={logo} className="img-fluid" alt="Ask The Flock" />       
      </a>
        <h1 className="">Oops Page Not Found!</h1>
        <p>The page you are trying to reach can not be found. Go to the <a href="/">HomePage</a> and try it again.</p>
        
      </div>
    </div>
    )}
  ;
  
  export default NotFound;
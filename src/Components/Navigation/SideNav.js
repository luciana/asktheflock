import React, {useContext} from 'react';
import Avatar from 'react-avatar';
import logo from'../../Assets/Images/logos/Flock-App-logo-black-small.png';
import { LANGUAGES, ROUTES } from "../../Constants";
import { AppContext } from "../../Contexts";
import { useNavigate, NavLink } from "react-router-dom";
import { Nav, NavItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';

function SideNav({ handleSignOut }) {
    const { state } = useContext(AppContext);
    const { user } = state;
    const navigate = useNavigate();
    const tabs = [{
        route: ROUTES[user.locale].MAIN,
        icon: faHome,
        label: LANGUAGES[user.locale].Home
      },{
        route: "/Profile",
        icon: faUserCircle,
        label: LANGUAGES[user.locale].Profile.Profile
      }]

   
  return(
      <>       
     {/* Top Bar Filtering*/}
    <div className={true ? 'd-none' : 'd-block'}>
      <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top top-tab-nav" 	role="link">
        <div className="container-fluid">
            <a className="navbar-brand" href={ROUTES[user.locale].MAIN}>Flock App</a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to={ROUTES[user.locale].MAIN} className="nav-link bg-company-white">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/stats" className="nav-link bg-company-white">
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/#" className="nav-link bg-company-white">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
      </div>
       {/* Bottom Tab Navigator*/}
       <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {
              tabs.map((tab, index) =>(
                <NavItem key={`tab-${index}`}>
               
                  <NavLink to={tab.route} className={(navData) => (navData.isActive ? "nav-link bottom-nav-link active-style" : 'nav-link bottom-nav-link none')}>
                    <div className="row d-flex flex-column align-items-center">
                      <FontAwesomeIcon size="lg" icon={tab.icon} className="bg-company-white"/>
                      <div className="bottom-tab-label d-flex flex-column align-items-center bg-company-white">{tab.label}</div>
                    </div>
                  

                  </NavLink>
                </NavItem>
              ))
            }

            <div className="row d-flex flex-column align-items-center">
              <button onClick={() => handleSignOut()} className="btn nav-link js-scroll-trigger">
                      <FontAwesomeIcon size="lg" icon={faSignOut} className="bg-company-white"/>
                      <div className="bottom-tab-label d-flex flex-column align-items-center bg-company-white">
                      {LANGUAGES[user.locale].Profile.SignOut}
                      </div>
                </button>
             </div>
             
                        
             

          </div>
        </Nav>
      </nav>
        {/* Side Tab Navigator*/}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="sideNav">       
            <div className="navbar-brand js-scroll-trigger">
                <span className="d-block d-lg-none">{process.env.REACT_APP_TITLE}</span>
                <span className="d-none d-lg-block text-wrap">    
                    <p><img src={logo} className="img-fluid" alt={process.env.REACT_APP_TITLE} /> </p>
                    <Avatar  name={user.name}  
                    className="  rounded-circle mx-auto mb-2" />
                    <div className="text-white my-3 profile-name">{user.name}</div>   
                </span>          
            </div>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav mx-5">                                                                     
                    <li className="nav-item"><button className="btn nav-link js-scroll-trigger" onClick={() => navigate(ROUTES[user.locale].MAIN)}>{LANGUAGES[user.locale].Questions.Questions}</button></li>     
                    {/* <li className="nav-item"><button className="btn nav-link js-scroll-trigger" onClick={() => navigate(ROUTES[user.locale].NEW_QUESTION)}>{LANGUAGES[user.locale].Questions.NewQuestion}</button></li>   */}
                    <li className="nav-item"><button className="btn nav-link js-scroll-trigger" onClick={() => navigate(ROUTES[user.locale].PROFILE)}>{LANGUAGES[user.locale].Profile.Profile}</button></li>  
                    <hr />
                    <li className="nav-item">                     
                     
                      <button onClick={() => handleSignOut()} className="btn nav-link js-scroll-trigger">
                        {LANGUAGES[user.locale].Profile.SignOut}
                      </button>
                      </li>       
                    <hr className='my-4' />     
                       
                </ul>
         
            </div>
        </nav>
      </>
  );
}

export default SideNav;
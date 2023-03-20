import logo from'../../Assets/Images/logos/Ask-The-Flock-logo_transparent-smaller.png';
import { NavLink } from "react-router-dom";
import { Nav, NavItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {  LANGUAGES, ROUTES } from "../../Constants";
import Flags  from '../Flags';

const HomeNav = ({locale}) => {
  
  if(!locale) locale="en-US";
  const tabs = [{
    route: "/",
    icon: faHome,
    label: LANGUAGES[locale].Home
  },{
    route: "/signin",
    icon: faSignIn,
    label: LANGUAGES[locale].Auth.SignInTitle
  }
  ,{
    route: "/signup",
    icon: faUserPlus,
    label: LANGUAGES[locale].Auth.SignUpTitle
  }]

	return (
    <div>
       {/* Top Bar*/}
      <nav className="navbar  navbar-expand-md navbar-light d-none d-lg-block sticky-top top-tab-nav" 	role="link">
        <div className="container-fluid">        
            <a className="navbar-brand" href={ROUTES[locale].HOME}>            
            <img src={logo} className="img-fluid" alt={process.env.REACT_APP_TITLE} />
           
            </a>
            <Flags />
            <div className="navbar-nav">            
              <Nav className="ml-auto">
              {
                tabs.map((tab, index) =>(
                  <NavItem key={`tab-${index}`}>               
                    <NavLink to={tab.route} className={(navData) => (navData.isActive ? "nav-link bottom-nav-link active-style" : 'nav-link bottom-nav-link none')}>
                      <div className="nav-link  row d-flex flex-column justify-content-center align-items-center">
                          <FontAwesomeIcon size="lg" icon={tab.icon} className="bg-company-white"/>
                        <div className="bg-company-white justify-content-center align-items-center">{tab.label}</div>
                      </div>
                    </NavLink>
                  </NavItem>
                ))
              }
              </Nav>
            </div>
           
        </div>
      </nav>

       {/* Bottom Tab Navigator*/}
       <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {
              tabs.map((tab, index) =>(
                <NavItem key={`tab-${index}`}>
               
                  <NavLink to={tab.route} className={(navData) => (navData.isActive ? "nav-link bottom-nav-link active-style" : 'nav-link bottom-nav-link none')}>
                    <div className="row d-flex  flex-column justify-content-center align-items-center">
                      <FontAwesomeIcon size="lg" icon={tab.icon} className="bg-company-white"/>
                      <div className="bottom-tab-label bg-company-white d-flex flex-column align-items-center">{tab.label}</div>
                    </div>
                  </NavLink>
                </NavItem>
              ))
            }
          </div>
        </Nav>
      </nav>
      </div>
  )
};

export default HomeNav;
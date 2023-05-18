import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { ROUTES, TYPES } from "../../Constants";
import Auth from "../../Services/auth";
import '../pages.css';
import '../../App.css';
import './../profile-nav.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import { SideNav, Loading} from "../../Components";

export default function Layout() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const loadUser = useCallback(async ({force, email, locale, name, address, birthdate, gender, userTag, lastLoggedIn, loggedInCount}) => {           
   
    if ( !state.user || force === true) {      
      let user = await Queries.GetUserByEmail(email);      
      if (!user) {
        //The user is created in cognito but not in GraphQL. 
        //Create user in GraphQL with the attributes from Cognito 
          console.log("create user with lastLoggedIn date ")
          user = await Mutations.CreateUser(email, locale, name, address, birthdate, gender, userTag, lastLoggedIn, loggedInCount);              
      }
     
      //check if user is updating profile, if so dont record login count
      if(lastLoggedIn && loggedInCount){
         //user login count - item is set in Sign in methods on AuthLayout
         const l = sessionStorage.getItem('logged_in');  
         if(l){
          // console.log("should log count once");
           recordLoginInfo(user.email);          
         }        
      }
     //Update language and user in context
      dispatch({ type: TYPES.UPDATE_LANG, payload: locale || user.locale });
      dispatch({ type: TYPES.UPDATE_USER, payload: user });      
      const myVotes = await Queries.GetVotesByUserId(user.id);
      const votes = (myVotes && myVotes.length > 0 ) ? myVotes : [];
      dispatch({ type: TYPES.UPDATE_VOTES, payload: votes });      
    }

  }, []);


  

  const handleSignOut = async () => {  
    await Auth.SignOut();
    sessionStorage.removeItem('logged_in');  
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    dispatch({ type: TYPES.UPDATE_VOTES, payload: null });
    navigate(ROUTES[state.lang].HOME);
  };

  const recordLoginInfo = async (email) => { 

    try{    
      if( email ){
        let user = await Queries.GetUserByEmail(email);
          
        if (user) {
        //user already exist in dynamo, update last Logged In and Login count   
         // console.log("update user login info", user.loggedInCount, user.lastLoggedIn);
          const logInCloud = user.loggedInCount ? user.loggedInCount : 0;            
          user =  await Mutations.UpdateUserLoggedInData({ id: user.id, lastLoggedIn: new Date(), loggedInCount: logInCloud+1 });
          sessionStorage.removeItem('logged_in'); 
        }
      }
    }catch(error){
      console.log("Error logging user Login Count", error);
    }
  }

  
  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const attributes = await Auth.GetUser();
        
        await loadUser({
          email: attributes.email,
          name: attributes.name,  
          locale: attributes.locale  ? attributes.locale : "en-US",         
          gender: attributes.gender ? attributes.gender : "",
          address: attributes.address ? attributes.address : "",
          birthdate: attributes.birthdate ? attributes.birthdate : null,
          userTag: "",
          lastLoggedIn: new Date(),
          loggedInCount: 1,
        });

        //deep link
        const beforeLoginUrl = sessionStorage.getItem('redirect_to');     
        if(beforeLoginUrl){
          //console.log("beforeLoginUrl", beforeLoginUrl);
          sessionStorage.removeItem('redirect_to');
          navigate(beforeLoginUrl);
        }

       

      } catch (error) {        
        if(location){   
          //deep link
           // console.log("storing in session storage location.state?.from?.pathname", location?.pathname, location?.search);
            sessionStorage.setItem('redirect_to',  location.pathname + location.search);            
        }           
        if(String(error).includes("The user is not authenticated")){   
          sessionStorage.removeItem('logged_in');           
          dispatch({ type: TYPES.UPDATE_USER, payload: null });           
        }      
       navigate(ROUTES[state.lang].HOME);
      }
    };

    isUserLoggedIn();
  }, [loadUser, dispatch, navigate, state.lang]);

  

  if (!state.user) return <Loading />;


  return (
    <section className="App profile mx-auto max-w-screen-lg h-screen">
      {loading && <Loading />}
     
      <SideNav handleSignOut={handleSignOut} />
      <div className="">  
          <Outlet context={{ loadUser, setLoading }} />

      </div>     
     
    </section>
  );
}
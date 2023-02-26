import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { ROUTES, TYPES } from "../../Constants";
import Auth from "../../Services/auth";
import '../pages.css';
import '../../App.css';
import './../profile-nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import { SideNav, Loading} from "../../Components";
import { Hub } from 'aws-amplify';

export default function Layout() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(async ({force, email, locale, name, address, birthdate, gender, userTag}) => {      
     console.log("Layout.js loadUser input", email, locale, name, address, birthdate, gender);
     console.log("Layhout.js is user in state?", state);  
    if ( !state.user || force === true) { 
      console.log("Layhout.js about to create user in Query", state.user, email);  
      let user = await Queries.GetUserByEmail(email);
      if (!user) {
        //The user is created in cognito but not in GraphQL. 
        //Create user in GraphQL with the attributes from Cognito
        console.log("Layout.js queries.GetUserByEmail result", user);  
        user = await Mutations.CreateUser(email, locale, name, address, birthdate, gender, userTag);    
        console.log("Layout.js create user in mutation", user);
      }
     //Update language and user in the cookie
      dispatch({ type: TYPES.UPDATE_LANG, payload: locale || user.locale });
      dispatch({ type: TYPES.UPDATE_USER, payload: user });
    } 
    // console.log("User exist in the state" , state.user);
  }, [dispatch, state]);

  const handleSignOut = async () => {
    
    await Auth.SignOut();
    console.log("Cleared cognito data in handlesignout" , state.user);
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    console.log("Cleared user data in state");
    navigate(ROUTES[state.lang].HOME);
  };


  //listen for sign in + out events, if neither are happening check if user exists 
useEffect(() => {
  Hub.listen('auth', ({ payload }) => {
    if (payload.event === 'signIn') {
          console.log("Home.js sign in event", payload.event);
          getUser();
  }
    if (payload.event === 'signOut') {  
        handleSignOut();
        console.log("Home.js signout event", payload.event);

      }
  });
  getUser();
}, [getUser]);

async function getUser() {
  // try {
  //   const token = await Auth.currentAuthenticatedUser();           
  //   console.log("Home.js get  user", token);
  // } catch(error) {
  //    console.error("Home.js get  user error",error);      
  //    }
  try {
    const attributes = await Auth.GetUser();
    console.log("Layout.js getUser attributes", attributes);
    await loadUser({
      email: attributes.email,
      name: attributes.name,  
      locale: attributes.locale  ? attributes.locale : "en-US",         
      gender: attributes.gender ? attributes.gender : "",
      address: attributes.address ? attributes.address : "",
      birthdate: attributes.birthdate ? attributes.birthdate : null,
      userTag: "",
    });
  } catch (error) {
    console.error("Layout.js Main error in isUserLoggedIn", error);
    if(error === "Error: No current user"){
      //clear cookies
      console.error("Layout.js Main error in isUserLoggedIn clear cookie", error);     
    }
   navigate(ROUTES[state.lang].HOME);
  }
}

  // useEffect(() => {
  //   const isUserLoggedIn = async () => {
  //     try {
  //       const attributes = await Auth.GetUser();
  //       console.log("Layout.js isUserLoggedIn Auth GetUser attributes", attributes);
  //       await loadUser({
  //         email: attributes.email,
  //         name: attributes.name,  
  //         //locale: attributes.locale,         
  //         gender: attributes.gender,
  //         address: attributes.address,
  //         birthdate: attributes.birthdate,
  //         userTag: "",
  //       });
  //     } catch (error) {
  //       console.error("Layout.js Main error in isUserLoggedIn", error);
  //       if(error === "Error: No current user"){
  //         //clear cookies
  //         console.error("Layout.js Main error in isUserLoggedIn clear cookie");
  //         //dispatch({ type: TYPES.UPDATE_USER, payload: "" });
  //         //localStorage.removeItem("aws-amplify-federatedInfo");
  //       }
  //      // navigate(ROUTES[state.lang].SIGN_IN);
  //     }
  //   };

  //   isUserLoggedIn();
  // }, [loadUser, navigate, state.lang]);

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
import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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

  const loadUser = useCallback(async ({force, email, locale, name, address, birthdate, gender, userTag}) => {        
    if ( !state.user || force === true) { 
     
      let user = await Queries.GetUserByEmail(email);
      if (!user) {
        //The user is created in cognito but not in GraphQL. 
        //Create user in GraphQL with the attributes from Cognito
        user = await Mutations.CreateUser(email, locale, name, address, birthdate, gender, userTag);    
      }
     //Update language and user in the cookie
      dispatch({ type: TYPES.UPDATE_LANG, payload: locale || user.locale });
      dispatch({ type: TYPES.UPDATE_USER, payload: user });
    } 
  }, [dispatch, state]);

  const handleSignOut = async () => {
    
    await Auth.SignOut();
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    navigate(ROUTES[state.lang].HOME);
  };

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
        });
      } catch (error) {
        console.error("Layout.js Main error in isUserLoggedIn", error);
        if(String(error).includes("The user is not authenticated")){         
          //clear cookies         
          dispatch({ type: TYPES.UPDATE_USER, payload: "" });   
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
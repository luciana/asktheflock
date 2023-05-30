import { lazy, Suspense, useContext, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { AppContext } from "./Contexts";
import { ROUTES, TYPES } from "./Constants";
import { Loading } from "./Components";
import './Assets/Fonts/BebasNeue-Regular.ttf';

const componentMap = {
  NotFound: "./Pages/NotFound",
  AuthLayout: "./Pages/Auth/AuthLayout",
  SignIn: "./Pages/Auth/SignIn",
  ForgotPassword: "./Pages/Auth/ForgotPassword",
  RedefinePassword: "./Pages/Auth/RedefinePassword",
  SignUp: "./Pages/Auth/SignUp",
  ConfirmSignUp: "./Pages/Auth/ConfirmSignUp",
  Layout: "./Pages/Layout/Layout",
  Main: "./Pages/Main",
  Stats: "./Pages/Main/Stats",
  Admin: "./Pages/Admin",
  AdminUsers: "./Pages/Admin/Users",
  Home: "./Pages/Home",
  Privacy: "./Pages/Terms/Privacy",
  Profile: "./Pages/Profile",
};

Object.keys(componentMap).forEach((key) => {
  componentMap[key] = lazy(() => import(componentMap[key]));
});

function App() {
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (searchParams.get("lang"))
      dispatch({ type: TYPES.UPDATE_LANG, payload: searchParams.get("lang") });
    }, [dispatch, searchParams]);

  const getRoute = (routeName) => ROUTES[state.lang][routeName];

  return (
    <Suspense fallback={<Loading />}>
      <Routes>              
        <Route path={getRoute('HOME')} element={<componentMap.Home />} />     
        <Route path={getRoute('PRIVACY')} element={<componentMap.Privacy />} />              
        <Route element={<componentMap.AuthLayout />}>
          <Route path={getRoute('SIGN_IN')} element={<componentMap.SignIn />} />
          <Route path={getRoute('FORGOT_PASSWORD')} element={<componentMap.ForgotPassword />} />
          <Route path={getRoute('REDEFINE_PASSWORD')} element={<componentMap.RedefinePassword />}/>
          <Route path={getRoute('SIGN_UP')} element={<componentMap.SignUp />} />
          <Route path={getRoute('CONFIRM_SIGN_UP')} element={<componentMap.ConfirmSignUp />}/>
        </Route>
        <Route element={<componentMap.Layout />}>         
          <Route path={getRoute('MAIN')} element={<componentMap.Main />} />
          <Route path={getRoute('QUESTION_STATS')}  element={<componentMap.Stats />} />
          <Route path={getRoute('PROFILE')}element={<componentMap.Profile />} />         
          <Route path={getRoute('ADMIN')} element={<componentMap.Admin />} /> 
          <Route path={getRoute('ADMINUSERS')} element={<componentMap.AdminUsers />} /> 
        </Route>
        <Route path="*" element={<componentMap.NotFound />} />
       
      </Routes>
    </Suspense>
  );
}

export default App;

import { lazy, Suspense, useContext, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { AppContext } from "./Contexts";
import { ROUTES, TYPES } from "./Constants";
import { Loading } from "./Components";

const NotFound = lazy(() => import("./Pages/NotFound"));
const AuthLayout = lazy(() => import("./Pages/Auth/AuthLayout"));
const SignIn = lazy(() => import("./Pages/Auth/SignIn"));
const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));
const RedefinePassword = lazy(() => import("./Pages/Auth/RedefinePassword"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const ConfirmSignUp = lazy(() => import("./Pages/Auth/ConfirmSignUp"));


const Layout = lazy(() => import("./Pages/Layout/Layout"));
const Main = lazy(() => import("./Pages/Main"));
const Home = lazy(() => import("./Pages/Home"));
const Terms = lazy(() => import("./Pages/Terms"));
const Profile = lazy(() => import("./Pages/Profile"));
const NewQuestion = lazy(() => import("./Pages/NewQuestion"));

function App() {
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (searchParams.get("lang"))
      dispatch({ type: TYPES.UPDATE_LANG, payload: searchParams.get("lang") });
    }, [dispatch, searchParams]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        
        <Route path={ROUTES[state.lang].HOME} element={<Home />} />
        <Route path={ROUTES[state.lang].TERMS} element={<Terms />} />
       
        
        <Route element={<AuthLayout />}>
          <Route path={ROUTES[state.lang].SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES[state.lang].FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES[state.lang].REDEFINE_PASSWORD} element={<RedefinePassword />}/>
          <Route path={ROUTES[state.lang].SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES[state.lang].CONFIRM_SIGN_UP} element={<ConfirmSignUp />}/>
        </Route>
        <Route element={<Layout />}>
         
          <Route path={ROUTES[state.lang].MAIN} element={<Main />} />
          <Route path={ROUTES[state.lang].PROFILE} element={<Profile />} />         
          <Route path={ROUTES[state.lang].NEW_QUESTION} element={<NewQuestion />} />
        </Route>
        <Route path="*" element={<NotFound />} />
       
      </Routes>
    </Suspense>
  );
}

export default App;
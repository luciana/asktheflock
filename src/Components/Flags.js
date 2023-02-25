import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts";
import { LANGUAGES, ROUTES, TYPES } from "../Constants";
import BR from "../Assets/Images/flags/pt-BR.svg";
import EN from "../Assets/Images/flags/en-US.svg";
import { Dropdown } from 'bootstrap';

export default function Flags() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);


  useEffect(() => {
    Array.from(document.querySelectorAll('button[data-bs-toggle="dropdown"]'))
    .forEach(dpNode => new Dropdown(dpNode))

  });

  
  function showFlag(lang) {
    if (lang === "pt-BR")
      return <img src={BR} alt="Português" height="20" className="" /> ;
    return <img src={EN} alt="English" height="20" className="" />;
  }

  function showLanguageName(lang){
    if (lang === "pt-BR") 
      return <span className="text-sm">Português</span>;
    return <span className="text-sm">English</span>;
  }

  function handleChangeLanguage(lang) {
    const currentRoute = Object.keys(ROUTES[state.lang])
      .map((k) => ({ key: k, value: ROUTES[state.lang][k] }))
      .find((r) => r.value === location.pathname);
    dispatch({ type: TYPES.UPDATE_LANG, payload: lang });
    navigate(ROUTES[lang][currentRoute.key]);
  }

  return (

  <div className="dropdown">
    
    <button className="btn btn-black border-0 dropdown-toggle" 
            type="button" 
          
            id="dropdownMenuButton1"          
            data-bs-toggle="dropdown" aria-expanded="false">
      {showFlag(state.lang)}  
    </button>
    <ul       
      aria-labelledby="dropdownMenuButton1"
      className="dropdown-menu "
    >
      {Object.keys(LANGUAGES)
        .filter((l) => l !== state.lang)
        .map((l) => (
          <li key={l}>
            <button type="button" className="dropdown-item" onClick={() => handleChangeLanguage(l)}>
              {showFlag(l)}  {showLanguageName(l)}
            </button>
          </li>
        ))}
    </ul>
  </div>


  );
}
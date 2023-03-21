import BR from "../Assets/Images/flags/pt-BR.svg";
import EN from "../Assets/Images/flags/en-US.svg";

export default function showFlagImage(locale) {

function showFlag(lang) {
    if (lang === "pt-BR")
      return <img src={BR} alt="Português" height="20" className="" /> ;
    return <img src={EN} alt="English" height="20" className="" />;
  }

  return (
    <>
    {showFlag(locale)}  
    </>
  )

}

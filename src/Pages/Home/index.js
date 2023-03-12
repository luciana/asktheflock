import React from 'react';
import { Footer } from '../../Components/Shared/index';
import '../pages.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { ROUTES, LANGUAGES } from "../../Constants";
import { HomeNav, WebNotification} from '../../Components';
import Badge from '../../Components/Votes/Badge';


function Home() {
    const { state } = useContext(AppContext);
    const navigate = useNavigate();
    const { user } = state;

    useEffect(() => {
        const isUserLoggedIn = async () => {
          try {
            if( user ){              
                navigate(ROUTES[state.lang].MAIN);
            }          
          } catch (error) {
            console.error("Home.js error checking if user exists in state(AskTheFlockAppState)", error);    
           //navigate(ROUTES[state.lang].HOME);
          }
        };
       
        isUserLoggedIn();
      }, [navigate, user, state.lang]);

  return (
    <div className="App">    

        <HomeNav locale={state.lang}/>     
        <div>       
        <header className="masthead d-flex align-items-center">
            <div className="container px-4 px-lg-5 text-center">
                <h1 className="mb-1">Ask The Flock </h1>
                <h3 className="mb-5">{LANGUAGES[state.lang].HomePage.TagLine} </h3>
                <button className="btn btn-light mx-2 btn-lg" onClick={()=> navigate(ROUTES[state.lang].SIGN_UP)}>{LANGUAGES[state.lang].Auth.SignUpTitle}</button>
                <a className="btn btn-dark mx-2 btn-lg" href="/#services">{LANGUAGES[state.lang].HomePage.LearnMore}</a>
                <a className="d-block my-2" onClick={()=> navigate(ROUTES[state.lang].SIGN_IN)} >or {LANGUAGES[state.lang].Auth.SignInTitle} </a>
                         
            </div>
        </header>
        </div>    
            
        <section className="App-header content-section  text-white text-center" id="services">
            <div className="container px-2 px-lg-2">
                <div className="content-section-heading">
                    <h3 className="text-secondary mb-0">{LANGUAGES[state.lang].HomePage.OurOffer}</h3>
                    <h2 className="mb-5">{LANGUAGES[state.lang].HomePage.HowItWorks}</h2>
                </div>
                <div className="row gx-4 gx-lg-4">
                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                        <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-screen-smartphone"></i></span>
                        <h4><strong>{LANGUAGES[state.lang].HomePage.PostAQuestion}</strong></h4>
                        <p className="text-faded mb-0">{LANGUAGES[state.lang].HomePage.EnterOptions}</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                        <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-pencil"></i></span>
                        <h4><strong>{LANGUAGES[state.lang].HomePage.PollCreated}</strong></h4>
                        <p className="text-faded mb-0">{LANGUAGES[state.lang].HomePage.PollSetUp}</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
                        <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-like"></i></span>
                        <h4><strong>{LANGUAGES[state.lang].HomePage.BestDecision}</strong></h4>
                        <p className="text-faded mb-0">                          
                            {LANGUAGES[state.lang].HomePage.PeopleVote}                    
                        </p>
                    </div>    
                    <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
                        <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-tasks"></i></span>
                        <h4><strong>{LANGUAGES[state.lang].HomePage.PollResults}</strong></h4>
                        <p className="text-faded mb-0">                          
                            {LANGUAGES[state.lang].HomePage.LearnHowPeopleVoted}                    
                        </p>
                    </div>                
                </div>
            </div>
        </section>
        <section className="App-header content-section  text-white text-center" id="badges">
            <div className="container px-2 px-lg-2">
                <div className="content-section-heading">
                    <h3 className="text-secondary mb-0"> {LANGUAGES[state.lang].HomePage.EarnBadges}  </h3>
                    <h2 className="mb-5">{LANGUAGES[state.lang].HomePage.YouDeserveIt} </h2>
                </div>
                <Badge count={null}/>
            </div>
        </section>
        <Footer></Footer>
        
    </div>
  );
}

export default Home;
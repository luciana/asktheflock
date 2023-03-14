import React from 'react';
import { Footer } from '../../Components/Shared/index';
import '../pages.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { ROUTES, LANGUAGES } from "../../Constants";
import { HomeNav} from '../../Components';
import Badge from '../../Components/Votes/Badge';
import portfolio1 from './../../Assets/Images/portfolio-1.jpg';
import portfolio2 from './../../Assets/Images/portfolio-2.jpg';
import portfolio3 from './../../Assets/Images/portfolio-2.jpg';
import portfolio4 from './../../Assets/Images/portfolio-4.jpg';


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
                <a className="btn btn-dark mx-2 btn-lg" href="/#about">{LANGUAGES[state.lang].HomePage.LearnMore}</a>
                <a className="d-block my-2" onClick={()=> navigate(ROUTES[state.lang].SIGN_IN)} >or {LANGUAGES[state.lang].Auth.SignInTitle} </a>
                         
            </div>
        </header>
        </div>    
    {/* why */}
        <section className="content-section bg-light" id="about">
            <div className="container px-4 px-lg-5 text-center">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-10">
                        <h2>Just Follow The Flock</h2>
                        <p className="lead mb-5">
                        Reduce the stress of having to make minor decisions multiple times a day. We can help you minimize decision fatigue by enlisting the world as a choice advisor. You will have fun in the process and even help others! 
                        </p>
                        <a className="btn btn-dark mx-2 btn-lg" href="#services">How it works</a>
                    </div>
                </div>
            </div>
        </section>
        {/* who it works */}
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
                        <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-mustache"></i></span>
                        <h4><strong>{LANGUAGES[state.lang].HomePage.PollResults}</strong></h4>
                        <p className="text-faded mb-0">                          
                            {LANGUAGES[state.lang].HomePage.LearnHowPeopleVoted}                    
                        </p>
                    </div>                
                </div>
            </div>
        </section>
        <section className="content-section" id="portfolio">
            <div className="container px-4 px-lg-5">
                <div className="content-section-heading text-center">
                    <h3 className="text-secondary mb-0">Features</h3>
                    <h2 className="mb-5">Wait, there is more</h2>
                </div>
                <div className="row gx-0">
                    <div className="col-lg-6">
                        <a className="portfolio-item" href="#!">
                            <div className="caption">
                                <div className="caption-content">
                                    <div className="h1">Relationship</div>
                                    <p className="mb-0">The more questions you ask and answer, the more relationships you create with others who can be more valuable in helping you with a decision!  </p>
                                </div>
                            </div>
                            <img className="img-fluid opacity-2" src={portfolio1} alt="..." />
                        </a>
                    </div>
                    <div className="col-lg-6">
                        <a className="portfolio-item" href="#!">
                            <div className="caption">
                                <div className="caption-content">
                                    <div className="h1">Analysis</div>
                                    <p className="mb-0">We offer detailed analytical data on the overall results as well as on each of the options to aid in a quick decision process. No more decision fatigue!</p>
                                </div>
                            </div>
                            <img className="img-fluid opacity-2" src={portfolio2} alt="..." />
                        </a>
                    </div>                   
                    <div className="col-lg-6">
                        <a className="portfolio-item" href="#!">
                            <div className="caption">
                                <div className="caption-content">
                                    <div className="h1">Broadcast</div>
                                    <p className="mb-0">We are an independent platform. You don’t have to duplicate questions on many social media platforms. Share the question anywhere  with a unique link.</p>
                                </div>
                            </div>
                            <img className="img-fluid opacity-2" src={portfolio3} alt="..." />
                        </a>
                    </div>
                    <div className="col-lg-6">
                        <a className="portfolio-item" href="#!">
                            <div className="caption">
                                <div className="caption-content">
                                    <div className="h1">Badges</div>
                                    <p className="mb-0">Show the world what you’ve accomplished by helping others make decisions and asking for help too. You deserve the recognition. <a href="/#badges">See more. </a></p>
                                </div>
                            </div>
                            <img className="img-fluid opacity-2" src={portfolio4} alt="..." />
                        </a>
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
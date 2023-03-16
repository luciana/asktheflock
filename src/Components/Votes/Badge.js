import React, {useContext, useState, useEffect} from 'react';
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import { ProgressBar } from './../../Components/Chart';
import './Badge.scss';

//credit to: https://codepen.io/oliviale/pen/qpPByV

const Badge = ({count, label}) => {

    const { state } = useContext(AppContext);
    const { user } = state;
    const [progress, setProgress] = useState(0);
    const [selectBadge, setSelectBadge] = useState([]);

    let lang = "en-US";
    if (user) lang= user.locale;
  
    let badges = [{
        id: 1,
        color: "badge-earned yellow",
        hex: "#ffb300",
        icon: "fa fa-feather",
        label: LANGUAGES[lang].Badges.Level1,
        max: 10,
      },{
        id: 2,
        color: "badge-earned orange",
        icon: "fa fa-kiwi-bird",
        hex: "#f68401",
        label: LANGUAGES[lang].Badges.Level2,
        max: 100,
      },{
        id: 3,
        color: "badge-earned pink",
        icon: "fa fa-dove",
        hex: "#dc306f",
        label: LANGUAGES[lang].Badges.Level3,
        max: 500,
      },
      {
        id: 4,
        color: "badge-earned green",
        icon: "fa fa-crow",
        hex: "#198754",
        label: LANGUAGES[lang].Badges.Level4,
        max: 1000,
      },{
        id: 5,
        color: "badge-earned blue-dark",
        icon: "fa fa-tree",
        hex: "#1c68c5",
        label: LANGUAGES[lang].Badges.Level5,
        max: 2000,
      },{
        id: 6,
        color: "badge-earned blue",
        icon: "fa fa-dragon",
        label: LANGUAGES[lang].Badges.Level6,
        hex: "#259af3",
        max: 3000,
      },
      {
        id: 7,
        color: "badge-earned red",
        icon: "fa fa-feather-alt",
        hex: "#c62828",
        label: LANGUAGES[lang].Badges.Level7,
        max: 5000,
      },{
        id: 8,
        color: "badge-earned green-dark",
        icon: "fa fa-leaf",
        hex: "#00944a",
        label: LANGUAGES[lang].Badges.Level8,
        max: 7500,
      },{
        id: 9,
        color: "badge-earned purple",
        icon: "fa fa-anchor",
        hex: "#7127a8",
        label: LANGUAGES[lang].Badges.Level9,
        max:10000,
      },{
        id: 10,
        color: "badge-earned teal",
        icon: "fa fa-user fa-street-view",
        hex: "#20c997",
        label: LANGUAGES[lang].Badges.Level10,
        max: 50000,
      }
      ];
    
    const translateToBadgeId = (count) => {
        if(count < 10 ) return 1;
        if(count < 100 ) return 2;
        if(count < 500 ) return 3;
        if(count < 1000 ) return 4;
        if(count < 2000 ) return 5;
        if(count < 3000 ) return 6;
        if(count < 5000 ) return 7;
        if(count < 7500 ) return 8;
        if(count < 10000 ) return 9;
        if(count < 50000 ) return 10;   
        if(count > 50000 ) return 10;      
    }

    useEffect(()=>{      
      setUpBadges();   
     },[]);



     const setUpBadges = () => {
        if (count){       
            const id = translateToBadgeId(count);     
            const b = badges.filter((l) => l.id === id);          
            setSelectBadge(b);      
            if ( b.length > 0 ){
              let denominator = b[0].max;
              if( denominator ){        
                setProgress((count/denominator)*100);            
              } 
                  } 
        }else{
            setSelectBadge(badges);
        }
     }
   
    

    return (                      
            <>    
             {!count && (
                  <div className="main-badge-wrapper">
                  {
                      selectBadge.map((badge, index) =>(                     
                          <div className={badge.color} key={`badge-${index}`}>            
                              <div className="circle">
                                  <i className={badge.icon} aria-hidden="true"></i>
                                  <div className="ribbon">{badge.label}</div>
                              </div>                
                          </div>        
                      ))
                  }
                  </div>
                ) }                
              {count && selectBadge.length > 0 && selectBadge.map((badge, index) =>(  
                <div className=" border border-1" key={`badge-${index}`}>
                <div className="py-2 d-flex align-items-center" key={`badge-${index}`}>  
                  <div className="main-badge-wrapper">                  
                        <div className={badge.color} >            
                            <div className="circle">
                                <i className={badge.icon} aria-hidden="true"></i>
                                <div className="ribbon">{badge.label}</div>
                            </div>                
                        </div>
                  </div>
                  <div className="ms-2">
                    <strong>{badge.label}</strong><br/>
                    <span className="number"> {count} <span className="follow text-sm">{label}</span></span> <br />
                  
                  </div>  
                </div>     
                {progress !== 0 && (<div><span className="mx-2">{LANGUAGES[lang].Badges.ProgressToNextLevel}</span>
                            <ProgressBar bgcolor={badge.hex} progress={progress}  height={20} /></div>)}
                </div>                                         
              ))}
           </>    
    );
}


export default Badge
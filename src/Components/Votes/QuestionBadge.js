import React, {useContext} from 'react';
import { LANGUAGES, ROUTES } from "../../Constants";
import { AppContext } from "../../Contexts";
import './Badge.scss';

//credit to: https://codepen.io/oliviale/pen/qpPByV

const QuestionBadge = ({count, showIconOnly=false}) => {

    const { state } = useContext(AppContext);
    const { user } = state;
    let lang = "en-US";
    if (user) lang= user.locale;
  
    const badges = [{
        id: 1,
        color: "badge-earned yellow",
        icon: "fa fa-feather",
        hex: "#ffb300",
        label: LANGUAGES[lang].Badges.QuestionLevel1
      },{
        id: 2,
        color: "badge-earned orange",
        icon: "fa fa-kiwi-bird",
        hex: "#f68401",
        label: LANGUAGES[lang].Badges.QuestionLevel2
      },{
        id: 3,
        color: "badge-earned pink",
        icon: "fa fa-dove",
        hex: "#dc306f",
        label: LANGUAGES[lang].Badges.QuestionLevel3
      },
      {
        id: 4,
        color: "badge-earned green",
        icon: "fa fa-crow",
        label: LANGUAGES[lang].Badges.QuestionLevel4
      },{
        id: 5,
        color: "badge-earned blue-dark",
        icon: "fa fa-tree",
        hex: "#1c68c5",
        label: LANGUAGES[lang].Badges.QuestionLevel5
      },{
        id: 6,
        color: "badge-earned blue",
        icon: "fa fa-dragon",
        hex: "#259af3",
        label: LANGUAGES[lang].Badges.QuestionLevel6
      },
      {
        id: 7,
        color: "badge-earned red",
        icon: "fa fa-feather-alt",
        hex: "#c62828",
        label: LANGUAGES[lang].Badges.QuestionLevel7
      },{
        id: 8,
        color: "badge-earned green-dark",
        icon: "fa fa-leaf",
        hex: "#00944a",
        label: LANGUAGES[lang].Badges.QuestionLevel8
      },{
        id: 9,
        color: "badge-earned purple",
        icon: "fa fa-anchor",
        hex: "#7127a8",
        label: LANGUAGES[lang].Badges.QuestionLevel9
      }
      ];
    
    const translateToBadgeId = (count) => {
        if(count < 10 ) return 1;
        if(count < 100 ) return 2;
        if(count < 500 ) return 3;
        if(count < 1000 ) return 4;
        if(count < 3000 ) return 5;
        if(count < 5000 ) return 6;
        if(count < 7500 ) return 7;
        if(count < 10000 ) return 8;
        if(count < 50000 ) return 9;   
        if(count > 50000 ) return 9;      
    }

    let selectBadge = badges;     
    if (count){
        const id = translateToBadgeId(count);        
        selectBadge = badges.filter((l) => l.id === id)
    }
    return (       
      <>
      {!showIconOnly && (
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
      {showIconOnly && (
        <>
        {selectBadge.map((badge, index) =>(  
          <a href={ROUTES[user.locale].PROFILE} aria-label="Achievements" key={`badge-${index}`}         
          title={`You earned ${LANGUAGES[user.locale].Badges.QuestionLevel1} badge (${count} questions asked. )`}  >                                  
                <span className="fa-stack fa-lg "
                  style={{
                    color:badge.hex
                  }}
                >
                  <i className="fa fa-circle fa-stack-2x "></i>                 
                  <i className={`fa ${badge.icon} fa-stack-1x fa-inverse`}></i>
                </span> 
          </a>
          ))}
        </>
      )}
      </>
    );
}


export default QuestionBadge
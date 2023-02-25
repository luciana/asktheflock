import React, {useContext} from 'react';
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import './Badge.scss';

//credit to: https://codepen.io/oliviale/pen/qpPByV

const Badge = (count) => {

    const { state } = useContext(AppContext);
    const { user } = state;
    let lang = "en-US";
    if (user) lang= user.locale;
  
    const badges = [{
        id: 1,
        color: "badge-earned yellow",
        icon: "fa fa-feather",
        label: LANGUAGES[lang].Badges.Level1
      },{
        id: 2,
        color: "badge-earned orange",
        icon: "fa fa-kiwi-bird",
        label: LANGUAGES[lang].Badges.Level2
      },{
        id: 3,
        color: "badge-earned pink",
        icon: "fa fa-dove",
        label: LANGUAGES[lang].Badges.Level3
      },
      {
        id: 4,
        color: "badge-earned green",
        icon: "fa fa-crow",
        label: LANGUAGES[lang].Badges.Level4
      },{
        id: 5,
        color: "badge-earned blue-dark",
        icon: "fa fa-tree",
        label: LANGUAGES[lang].Badges.Level5
      },{
        id: 6,
        color: "badge-earned blue",
        icon: "fa fa-dragon",
        label: LANGUAGES[lang].Badges.Level6
      },
      {
        id: 7,
        color: "badge-earned red",
        icon: "fa fa-feather-alt",
        label: LANGUAGES[lang].Badges.Level7
      },{
        id: 8,
        color: "badge-earned green-dark",
        icon: "fa fa-leaf",
        label: LANGUAGES[lang].Badges.Level8
      },{
        id: 9,
        color: "badge-earned purple",
        icon: "fa fa-anchor",
        label: LANGUAGES[lang].Badges.Level9
      },{
        id: 10,
        color: "badge-earned teal",
        icon: "fa fa-user fa-street-view",
        label: LANGUAGES[lang].Badges.Level10
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

    let selectBadge = badges;     
    if (count){
        const userCount = count.count;  
        if (userCount){
        const id = translateToBadgeId(userCount);        
            selectBadge = badges.filter((l) => l.id === id)
        }
    }
    return (        
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
    );
}


export default Badge
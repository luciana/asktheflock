import { useContext} from "react";
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import { RiMapPin2Line, RiFlag2Line, RiMedal2Line }  from 'react-icons/ri';
import { FaRegCircle, FaBirthdayCake }  from 'react-icons/fa';
import './Card.css';
import {formatDateTime, flagImage, findGeneration, isAdmin} from '../../Helpers';

const Card = () => {

  const { state } = useContext(AppContext);
  const { user } = state;

  

  return (

    <>
    <div className="border border-1  p-3 my-2">
   
       <h3 className="profile-name ">{user.name}</h3>  
       <div className="">{user.email} </div>
       <div className="fw-lighter text-sm text-color-gray">{LANGUAGES[user.locale].Profile.Joined} {formatDateTime(user.createdAt)}</div>
       <div className="border border-1  p-3 my-2">
        <div className="" >    
          <div className="row py-2" >     
          <div className="col fw-lighter"> 
           <RiFlag2Line size={18}/> {LANGUAGES[user.locale].Languages[user.locale]  } {flagImage(user.locale)}            
          </div>   
          <div className="col fw-lighter">  
        
          {user.birthdate && user.birthdate.length > 0 && (   
              <div className=""><FaBirthdayCake size={18} />  {LANGUAGES[user.locale].Birth + " : "}{user.birthdate}  <span className="mx-2 text-color-gray" aria-hidden="true"> • </span>  {findGeneration(new Date(user.birthdate))} </div>
            )} 
          </div>                    
          </div>          
          <div className="row py-2" >    
            <div className="col fw-lighter"> 
            {user.userTag && user.userTag.length > 0 && (
                <span className=""><RiMedal2Line size={18} /> #{user.userTag}
                </span>           
                )} 
            
            </div>  
            <div className="col fw-ligther"> 
            {user.gender && user.gender.length > 0 && (              
              <div className=""><FaRegCircle size={15}/> {user.gender}</div>
            )} 
            </div> 
             
          </div>
          <div className="row" >    
            <div className="col fw-lighter"> 
            {user.address && user.address.length > 0 && (   
            <div className=""><RiMapPin2Line size={18}/> {user.address}</div>
            )}              
            </div> 
          </div>
       
      </div>
      </div>           
      </div>
      </>
  );
};

export default Card;
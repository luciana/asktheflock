/* eslint-disable no-useless-escape */
import { GENERATIONS } from "../Constants";
const findGeneration = (birthdate) => {   
    let year = birthdate.getFullYear();     
    if(year){
        const g = GENERATIONS.filter((i) =>  year >= i.start && year <= i.end);
        if(g && g.length>0){           
            return g[0].label;
        }
       
    }else{
        return null;
    }
   
  };
  
  export default findGeneration;
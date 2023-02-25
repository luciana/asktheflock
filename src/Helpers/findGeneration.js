/* eslint-disable no-useless-escape */
import { GENERATIONS } from "../Constants";
const findGeneration = (birthdate) => {   
    let year = birthdate.getFullYear();
  
   return GENERATIONS.filter((i) =>  year >= i.start && year <= i.end)[0].label;
  };
  
  export default findGeneration;
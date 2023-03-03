/* eslint-disable no-useless-escape */
import { GENERATIONS } from "../Constants";
const findGeneration = (birthdate) => {   
    let year = birthdate.getFullYear();
   // console.log("find Generations " , GENERATIONS.filter((i) =>  year >= i.start && year <= i.end));
   return GENERATIONS.filter((i) =>  year >= i.start && year <= i.end)[0].label;
  };
  
  export default findGeneration;
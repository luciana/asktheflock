import { useEffect, useState } from 'react';
import { Pie } from './../../Components/Chart';
import { Loading }  from '../../Components';


export default function GenderStats({dataInput, optionId}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

    useEffect(()=>{
     setLoading(true);  
     dataInput && setData(dataInput);
     setLoading(false);  
    },[data]);

    const buildGenderData = (name, value, optionId) =>{   
        if(value){
            return { value: value, name: name };
        }
    }
    const allMaleGender = (data).filter((i) => i.userGender === 'male').length;
    const allFemaleGender = (data).filter((i) => i.userGender === 'female').length;
    const allNonBinaryGender = (data).filter((i) => i.userGender === 'non-binary').length;
    const allNoneGender = (data).filter((i) => i.userGender === '' || !i.userGender).length;

    const pieAllGenderData = [];
    pieAllGenderData.push(buildGenderData('not given',allNoneGender ));
    pieAllGenderData.push(buildGenderData('male',allMaleGender ));
    pieAllGenderData.push(buildGenderData('female',allFemaleGender ));
    pieAllGenderData.push(buildGenderData('non-binary',allNonBinaryGender ));

        
    console.log("pieAllGenderData,pieAllGenderData",pieAllGenderData);
    const noneGenderListFor = (optionId) => ((data).filter((i) => i.optionId === optionId && (i.userGender === '' || !i.userGender)).length);
    const maleGenderListFor = (optionId) => ((data).filter((i) => i.optionId === optionId && i.userGender === 'male').length);
    const femaleGenderListFor = (optionId) => ((data).filter((i) => i.optionId === optionId && i.userGender === 'female').length);
    const nonBinaryGenderListFor = (optionId) => ((data).filter((i) => i.optionId === optionId && i.userGender === 'non-binary').length);
    
    const pieGenderDataFor = [];
    pieGenderDataFor.push(buildGenderData('not given',noneGenderListFor(optionId) ));
    pieGenderDataFor.push(buildGenderData('male',maleGenderListFor(optionId) ));
    pieGenderDataFor.push(buildGenderData('female',femaleGenderListFor(optionId) ));
    pieGenderDataFor.push(buildGenderData('non-binary',nonBinaryGenderListFor(optionId) ));


  return (
    <>
     {loading && <Loading />}
    {!optionId && (
         <>
         <div className="my-2">Male Votes: {allMaleGender} </div>
         <div className="my-2">Female Votes: {allFemaleGender} </div>
         <div className="my-2">Non-Binary Votes: {allNonBinaryGender} </div>     
         <div className="my-2">Not Entered: {allNoneGender}</div>  
         <div><Pie data={pieAllGenderData} /></div>  
         </>
    )}                                               
    
    {optionId && (
        <>
         <div className="my-2">Male Votes: {maleGenderListFor(optionId)} </div>
        <div className="my-2">Female Votes: {femaleGenderListFor(optionId)} </div>
        <div className="my-2">Non-Binary Votes: {nonBinaryGenderListFor(optionId)} </div>  
        <div className="my-2">Not Entered: {noneGenderListFor(optionId)}</div> 
        <div><Pie data={pieGenderDataFor} /></div>    
         </>
    )} 
    </>

  );
}
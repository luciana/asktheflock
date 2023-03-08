import { useEffect, useState } from 'react';
import { Loading }  from '../../Components';
import { Scatter } from './../../Components/Chart';
import { LANGUAGES } from "../../Constants";
import { findCounts } from './../../Helpers';


export default function AgeStats({dataInput, optionId, statListFor}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDataFor, setChartDataFor] = useState([]);
  const maxNumberOfAge = 5;

    useEffect(()=>{
     setLoading(true);  
     dataInput && setData(dataInput);
     buildScatterData();  
     buildScatterDataFor(optionId); 
     setLoading(false);  
    },[data]);

    const ageList = findCounts(data, "userAge", "userAge")
    .map((item) => {
        Object.keys(item).map((key) => {
          item[key] = (item[key] = '' ? 'No data' : item[key]); return item[key]
        });
        return item;
    })
    .sort((a, b) => b.userAge - a.userAge)
    .sort((a, b) => b.value - a.value)           
    .filter((item, idx) => idx < maxNumberOfAge);

    

    const ageListFor = (optionId) => (findCounts(statListFor(optionId), "userAge", "userAge")
    .map((item) => {
        Object.keys(item).map((key) => {
          item[key] = (item[key] == '' ? 'No data' : item[key]); return item[key]
        });
        return item;
    })
    .sort((a, b) => b.userAge - a.userAge)
    .sort((a, b) => b.value - a.value)           
    .filter((item, idx) => idx < maxNumberOfAge));

    const buildAgeData = (name, value) =>{   
        if(value){
            return [ name, value ];
        }
    }

    const buildScatterData = () =>{
        if( ageList && ageList.length > 0){
         const g = ageList.map((i) => buildAgeData(i.userAge,i.value ));        
         setChartData(g);
        }
      }
    
      const buildScatterDataFor = (optionId) =>{
        if( ageList && ageList.length > 0){
         const g = ageListFor(optionId).map((i) => buildAgeData(i.userAge,i.value ));        
         setChartDataFor(g);
        }
      }

  return (
    <>
    {loading && <Loading />}
    {!optionId && (
         <>
          {ageList.map((ex,index) => (                      
                        <ul key={index} className="align-items-center">                        
                            <li className=" lh-1 col">  {ex.userAge ? ex.userAge : 'No data'}: <span>{ex.value}</span></li>
                        </ul>
                        ))} 
         <div><Scatter data={chartData} /></div>   
         </>
    )}                                               
    {optionId && (
        <>
          {ageListFor(optionId).map((ex,index) => (                      
                        <ul key={index} className="align-items-center">                        
                            <li className=" lh-1 col">  {ex.userAge ? ex.userAge : 'No data'}: <span>{ex.value}</span></li>
                        </ul>
                        ))}  
            <div><Scatter data={chartDataFor} /></div>                                         
         </>
    )} 
    </>

  );
}
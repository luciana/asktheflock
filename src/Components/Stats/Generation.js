import { useEffect, useState } from 'react';
import { PieFull } from './../../Components/Chart';
import { Loading }  from '../../Components';
import { findCounts } from './../../Helpers';


export default function GenerationStats({dataInput, optionId, statListFor}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDataFor, setChartDataFor] = useState([]);

    useEffect(()=>{
     setLoading(true);  
     dataInput && setData(dataInput);
     buildGenerationChart();  
     buildGenerationChartFor(optionId); 
     setLoading(false);  
    },[data]);

    const buildGenerationData = (name, value) =>{   
        if(value){
            return { value: value, name: name };
        }
    }

    const generationList = findCounts(data, "userGen", "userGen")
      .map((item) => {
          Object.keys(item).map((key) => {
            item[key] = (item[key] === '' ? 'No data' : item[key]); return item[key]
          });
          return item;
      })
      .sort((a, b) => b.userGen - a.userGen)
      .sort((a, b) => b.value - a.value);  

      const buildGenerationChart = () =>{
        if( generationList && generationList.length > 0){
         const g = generationList.map((i) => buildGenerationData(i.userGen,i.value ));        
         setChartData(g);
        }
      }
    
  const generationListFor = (optionId) => (findCounts(statListFor(optionId), "userGen", "userGen")
        .map((item) => {
          Object.keys(item).map((key) => {
            item[key] = (item[key] === '' ? 'No data' : item[key]); return item[key]
          });
          return item;
      })
     .sort((a, b) => b.userGen - a.userGen)
     .sort((a, b) => b.value - a.value));  

    const buildGenerationChartFor = (optionId) =>{
      if( generationListFor && generationListFor.length > 0){
         const g = generationListFor(optionId).map((i) => buildGenerationData(i.userGen,i.value ));        
         setChartDataFor(g);
        }
     }

  


  return (
    <>
     {loading && <Loading />}
    {!optionId && (
         <>
        {generationList.map((ex,index) => (                      
                        <ul key={index} className="align-items-center">                        
                            <li className=" lh-1 col">  {ex.userGen}: <span>{ex.value}</span></li>
                        </ul>
                        ))}  
         <div><PieFull data={chartData} /></div>  
         </>
    )}                                               
    
    {optionId && (
        <>
         {generationListFor(optionId).map((ex,index) => (                      
                        <ul key={index} className="align-items-center">                        
                            <li className=" lh-1 col">  {ex.userGen}: <span>{ex.value}</span></li>
                        </ul>
                        ))}  
        <div><PieFull data={chartDataFor} /></div>    
         </>
    )} 
    </>

  );
}
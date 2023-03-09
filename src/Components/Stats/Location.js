import { useEffect, useState } from 'react';
import { Loading }  from '../../Components';
import { Map } from './../../Components/Chart';
import { LANGUAGES } from "../../Constants";
import { findCounts, findStateFromZip } from './../../Helpers';


export default function LocationStats({dataInput, optionId, statListFor}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDataFor, setChartDataFor] = useState([]);
  const maxNumberOfAddress = 5;

    useEffect(()=>{
     setLoading(true);  
     dataInput && setData(dataInput);
     buildMapData();  
     buildMapDataFor(optionId); 
     setLoading(false);  
    },[data]);


  const addressList = findCounts(data, "userAddress", "userAddress")
                        .map((item) => {
                            Object.keys(item).map((key) => {
                            item[key] = (item[key] = '' ? 'No location' : item[key]); return item[key]
                            });
                            return item;
                        })
                        .sort((a, b) => b.userAddress - a.userAddress)
                        .sort((a, b) => b.value - a.value)                        
                        .filter((item, idx) => idx < maxNumberOfAddress);
  
  const addressListFor = (optionId) => (findCounts(statListFor(optionId), "userAddress", "userAddress")
                    .map((item) => {
                        Object.keys(item).map((key) => {
                        item[key] = (item[key] = '' ? 'No location' : item[key]); return item[key]
                        });
                        return item;
                    })
                    .sort((a, b) => b.userAddress - a.userAddress)
                    .sort((a, b) => b.value - a.value)                        
                    .filter((item, idx) => idx < maxNumberOfAddress));

    const buildLocationData = (name, value) =>{   

        const stateName = findStateFromZip(name).long;
        if(value && stateName){
            return { value: value, name: stateName };
        }else{
            return null;
        }
    }

    const buildMapData = () =>{
        if( addressList && addressList.length > 0){
         const g = addressList.map((i) => buildLocationData(i.userAddress,i.value ))
                            .filter(elements => {return elements !== null;});          
         setChartData(g);
        }
      }
    
      const buildMapDataFor = (optionId) =>{
        if( addressList && addressList.length > 0){
         const g = addressListFor(optionId).map((i) => buildLocationData(i.userAddress,i.value ))
                        .filter(elements => {return elements !== null;});        
         setChartDataFor(g);
        }
      }

     // console.log("chart data", chartData);
     
  return (
    <>
    {loading && <Loading />}
    {!optionId && (
         <>
          {addressList.map((ex,index) => (                      
                    <ul key={index} className="align-items-center">                        
                        <li className=" lh-1 col">  {ex.userAddress ? ex.userAddress : 'No data'}: <span>{ex.value}</span></li>
                    </ul>
                    ))}
         <div><Map data={chartData} /></div>   
         </>
    )}                                               
    {optionId && (
        <>
            {addressListFor(optionId).map((ex,index) => (                      
                    <ul key={index} className="align-items-center">                        
                        <li className=" lh-1 col">  {ex.userAddress ? ex.userAddress : 'No data'}: <span>{ex.value}</span></li>
                    </ul>
                    ))}
            <div><Map data={chartDataFor} /></div>                                         
         </>
    )} 
    </>

  );
}
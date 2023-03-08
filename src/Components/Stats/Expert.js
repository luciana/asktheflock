import { useEffect, useState } from 'react';
import { Loading }  from '../../Components';
import { BarCustom } from './../../Components/Chart';
import { LANGUAGES } from "../../Constants";
import { findCounts } from './../../Helpers';


export default function ExpertStats({dataInput, optionId, statListFor, callOut}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartXData, setChartXData] = useState([]);
  const [chartYData, setChartYData] = useState([]);
  const [chartXDataFor, setChartXDataFor] = useState([]);
  const [chartYDataFor, setChartYDataFor] = useState([]);
  const maxNumberOfExpertTags = 5;

    useEffect(()=>{
     setLoading(true);  
     dataInput && setData(dataInput);
     buildBarXData();
     buildBarXDataFor(optionId);
     buildBarYData();
     buildBarYDataFor(optionId);
     setLoading(false);  
    },[data]);

    const expertsTags = findCounts(data, "userTag", "userTag")
                .map((item) => {
                      Object.keys(item).map((key) => {
                        item[key] = (item[key] == '' ? 'No data' : item[key]); return item[key]
                      });
                      return item;
                  })
                  .sort((a, b) => b.value - a.value)
                  .filter((item, idx) => idx < maxNumberOfExpertTags);

                

    const expertsTagsFor = (optionId) => (findCounts(statListFor(optionId), "userTag", "userTag")
                .map((item) => {
                    Object.keys(item).map((key) => {
                      item[key] = (item[key] == '' ? 'No data' : item[key]); return item[key]
                    });
                    return item;
                })
                .sort((a, b) => b.value - a.value)
                .filter((item, idx) => idx < maxNumberOfExpertTags));


    const buildXData = (name) =>{   
        if(name){
            return [ name ];
        }
    }

    const buildYData = (name) =>{   
      if(name){
          return [ name ];
      }
    }

    const buildBarXData = () =>{
        if( expertsTags && expertsTags.length > 0){
         const g = expertsTags.map((i) => i.userTag );             
         setChartXData(g);
        }
      }
    
    const buildBarXDataFor = (optionId) =>{
        if( expertsTags && expertsTags.length > 0){
         const g = expertsTagsFor(optionId).map((i) => i.userTag );        
         setChartXDataFor(g);
        }
      }

      const buildBarYData = () =>{
        if( expertsTags && expertsTags.length > 0){
         const g = expertsTags.map((i) =>i.value );         
        //  [
        //   5, 2, 
        //   {
        //     value: 1,
        //     itemStyle: {
        //       color: '#f5c135'
        //     }
        //   },
        // ]       
         setChartYData(g);
        }
      }
    
    const buildBarYDataFor = (optionId) =>{
        if( expertsTags && expertsTags.length > 0){
         const g = expertsTagsFor(optionId).map((i) => i.value );        
         setChartYDataFor(g);
        }
      }

     // console.log("chartXData", chartXData);

  return (
    <>
    {loading && <Loading />}
    {!optionId && (
         <>
          {expertsTags.map((ex,index) => (                      
                    <ul key={index} className="align-items-center">                        
                        <li className=" lh-1 col">  {ex.userTag ? ex.userTag : 'not an expert'}: <span>{ex.value}</span></li>
                    </ul>
                ))}
         <div><BarCustom title="Expertise" x={chartXData} y={chartYData} callOut={callOut} /></div>   
         </>
    )}                                               
    {optionId && (
        <>
          {expertsTagsFor(optionId).map((ex,index) => (                      
                        <ul key={index} className="align-items-center">                        
                            <li className=" lh-1 col">  {ex.userTag ? ex.userTag : 'not an expert'}: <span>{ex.value}</span></li>
                        </ul>
                    ))}
            <div><BarCustom title="Expertise" x={chartXData} y={chartYDataFor} callOut={callOut} /></div>                                         
         </>
    )} 
    </>

  );
}
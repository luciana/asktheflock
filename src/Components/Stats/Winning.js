import { useEffect, useState } from 'react';
import { Loading }  from '../../Components';
import { Pie } from './../../Components/Chart';
import { LANGUAGES } from "../../Constants";
import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';


const WinningStats = ({dataInput, total})  => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  // const [winner, setWinner] = useState('');


    useEffect(()=>{
     setLoading(true);  
     dataInput && setData(dataInput);
     buildChartData();
     setLoading(false);  
    },[data]);

   

    const winningOption = Math.max(...dataInput.map((o) => o.votes));  
    const wininingOptionItem = dataInput.filter((i) => i.votes === winningOption ); 
    const winners = wininingOptionItem.map((i) => i.text + ' ');
    const winner = wininingOptionItem.length === 1 ? wininingOptionItem[0].text : winners;


    const buildChartData = () => {
      const g = dataInput.map((w) =>  buildData(w.text, w.votes ))
                        .filter(elements => {return elements !== null;});         
      
                            
      setChartData(g);
  
    }
   
    const buildData = (name, value) =>{   
      if(value){
          return { value: value, name: name };
      }else{
        return null;
      }
    }

  return (
    <>
    {loading && <Loading />}
    <Pie data={chartData} />     
    <div className="my-2">Winning Option: <strong>{winner}</strong> </div>
    <div className="my-2"> Total Vote count: {total}</div>  
                                    
       
    </>

  );
};

export default WinningStats;
import { useEffect, useState } from 'react';
import { Loading }  from '../../Components';
import { Bar } from './../../Components/Chart';
import { LANGUAGES } from "../../Constants";


export default function LanguageStats({dataInput, optionId}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

    useEffect(()=>{
     setLoading(true);  
     dataInput && setData(dataInput);
     setLoading(false);  
    },[data]);

    const allEnglishSpeaker = (data).filter((i) => i.userLanguage === 'en-US').length;
    const allPortugueseSpeaker = (data).filter((i) => i.userLanguage === 'pt-BR').length;
    const englishSpeakerFor = ((optionId) =>( data).filter((i) => i.optionId === optionId && i.userLanguage === 'en-US').length);
    const portugueseSpeakerFor = ((optionId) =>( data).filter((i) => i.optionId === optionId && i.userLanguage === 'pt-BR').length);

  return (
    <>
    {loading && <Loading />}
    {!optionId && (
         <>
         <div className="my-2"> English Speakers: {allEnglishSpeaker}</div>    
         <div className="my-2"> Portuguese Speakers: {allPortugueseSpeaker}</div>   
         <div><Bar x={['English', 'Portuguese']} y={[allEnglishSpeaker, allPortugueseSpeaker]} /></div>   
         </>
    )}                                               
    {optionId && (
        <>
         <div className="my-2"> English Speakers: {englishSpeakerFor(optionId)}</div>    
         <div className="my-2"> Portuguese Speakers: {portugueseSpeakerFor(optionId)}</div>    
         <div><Bar x={['English', 'Portuguese']} y={[englishSpeakerFor(optionId), portugueseSpeakerFor(optionId)]} /></div>                                         
         </>
    )} 
    </>

  );
}
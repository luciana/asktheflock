import React, {useState} from 'react';
import { FaChartPie} from 'react-icons/fa';
import { LANGUAGES } from '../../Constants';
import StatsDialog from './StatsDialog';

function StatsDialogIcon({question, locale, commentDataForQuestion}) {
    const [showStatModal, setShowStatModal] = useState(false);
    const [statData, setStatData] = useState([]);
    const initModal = () => {   
      setShowStatModal(true);
      setStatData(question.stats ? JSON.parse(question.stats) : []);     
    }  
  return (
    <>
                           
      <button title="results" className="btn btn-sm  mx-1" onClick={()=> initModal()}>
        <FaChartPie alt={LANGUAGES[locale].Stats.QuestionStats} />
      </button>
      { showStatModal && (
          <StatsDialog question={question}
          statData={statData}
          locale={locale}
          commentDataForQuestion={commentDataForQuestion}
          showStatModalWindow={showStatModal} />   
      )}
                   
            
       
    </>
  )
}
export default StatsDialogIcon;
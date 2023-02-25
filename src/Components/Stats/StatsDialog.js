import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import { FaChartPie} from 'react-icons/fa';
import { LANGUAGES } from '../../Constants';
import Stats from './Stats';

function StatsDialog({question, locale}) {
    const [showStatModal, setShowStatModal] = useState(false);
    const [statData, setStatData] = useState([]);
    const initModal = () => {
      setStatData(question.stats ? JSON.parse(question.stats) : []);
      return setShowStatModal(!false)
    }  

  return (
    <>
                           
      <button className="btn btn-sm  mx-1" onClick={()=> initModal()}>
        <FaChartPie alt={LANGUAGES[locale].Stats.QuestionStats} />
      </button>
      <div>    
        <Modal fullscreen={true} show={showStatModal} >
              <Modal.Header closeButton onClick={() => {setShowStatModal(false)}}>
                <Modal.Title>{LANGUAGES[locale].Stats.Results}</Modal.Title>
              </Modal.Header>
              <Modal.Body >               
                  <Stats data={statData}
                         options={question.options}
                         text={question.text}
                         questionTag={question.questionTag} />                
              </Modal.Body>
              <Modal.Footer>                                                         
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={()=> {setShowStatModal(false)}}
                    >
                      Close
                    </button>                          
              </Modal.Footer>
        </Modal>     
         </div>
       
    </>
  )
}
export default StatsDialog;
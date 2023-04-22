import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import { LANGUAGES, ROUTES } from '../../Constants';
import Stats from './Stats';
import { useNavigate } from 'react-router-dom';

function StatsDialog({question, statData, locale, commentDataForQuestion, showStatModalWindow}) { 
  const [showStatModal, setShowStatModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {   
    setShowStatModal( showStatModalWindow);
  
  }, []);
  

  const handleModalClose = () => {
    setShowStatModal(false);
    navigate(ROUTES["en-US"].MAIN);
  }

 console.log("commentDataForQuestion",commentDataForQuestion);
  return (
    <> 
        <Modal fullscreen={true} show={showStatModal} >
              <Modal.Header closeButton onClick={() => { handleModalClose()}}>
                <Modal.Title>{LANGUAGES[locale].Stats.Results}</Modal.Title>
              </Modal.Header>
              <Modal.Body >               
                  <Stats data={statData}
                         options={question.options}
                         text={question.text}
                         commentDataForQuestion={commentDataForQuestion}
                         questionTag={question.questionTag} />                
              </Modal.Body>
              <Modal.Footer>                                                         
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={()=> { handleModalClose()}}
                    >
                      Close
                    </button>                          
              </Modal.Footer>
        </Modal>  
       
    </>
  )
}
export default StatsDialog;
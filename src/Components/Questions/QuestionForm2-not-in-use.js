import React, { useState, useRef } from 'react';
import {RiTimeLine} from 'react-icons/ri';

const QuestionForm2 = ({
  handleSubmit, 
  placeHolderText,
  submitLabel, 
  hasCancelButton = false,
  handleCancel,
  votePeriod,
  initialText = "",
 }) => {
  const [input, setInput] = useState(initialText);
  const inputRef = useRef(null);
  const isTextareaEmpty = input.length === 0;

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const handleChange = e => {
    
    setInput(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      parentId: null,
      userId: 2,
      username: "Luciana",
      name: "Luciana Bruscino",
      createdAt: new Date().toISOString(),
      voteEndAt: null,
      sentiment: "Positive",
      options:[],
    });
    //setInput('');
  }
  return (
    <form  className='todo-form'>
          <textarea
            placeholder={placeHolderText}
            value={input}
            onChange={handleChange}
            name='textarea'
            rows="4"
            maxLength={process.env.REACT_APP_MAX_QUESTION_CHARACTER}
            className='form-control '
            ref={inputRef}
          />         
          <div>
          <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="expertTag" className="col-form-label"><RiTimeLine size={24}/></label>
              </div>
              <div className="col-auto">
                <div className="form-check form-check-inline">
                    <input type="radio" onChange={handleChange} className="form-check-input" id="10" name="votePeriod" value="1440" checked={votePeriod === "1440"} /><label className="form-check-label text-sm "  htmlFor="1440">1 day</label>
                </div>
                <div className="form-check form-check-inline">
                    <input type="radio" onChange={handleChange} className="form-check-input" id="120" name="votePeriod" value="21600" checked={votePeriod === "21600"}/><label className="form-check-label text-sm " htmlFor="21600">15 days</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" onChange={handleChange} className="form-check-input" id="480" name="votePeriod" value="43200" checked={votePeriod === "43200"} /><label className="form-check-label text-sm " htmlFor="43200">30 days</label>
                </div>
              </div>             
            </div>           
          </div>
          <div>          
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="expertTag" className="col-form-label text-sm " data-bs-toggle="tooltip" data-bs-placement="top" title=" an expert opinion will weigh more">Expert Tag</label>
              </div>
              <div className="col-auto">
                <input type="expertTag" id="expertTag" className="form-control lh-1" placeholder="i.e #designer" value="" />
              </div>         
            </div>
          </div>

          <Button onClick={onSubmit} 
              disabled={isTextareaEmpty} 
              text=  {submitLabel}
              />
             
          {hasCancelButton && (
            <button
              type="button"
              className="btn btn-outline-dark rounded-pill"
              onClick={handleCancel}
            >
              Discard
            </button>
          )}
    </form>
  );
};

export default QuestionForm2;
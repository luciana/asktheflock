import React, { useState, useRef, useEffect } from 'react';

const QuestionCommentForm = ({
  handleSubmit, 
  placeHolderText,
  submitLabel, 
  hasCancelButton = false,
  handleCancel,
  initialText = "",
 }) => {
  const [input, setInput] = useState(initialText);
  const inputRef = useRef(null);
  const isTextareaEmpty = input.length === 0;
  const [characterCount, setCharacterCount] = useState(0);
  useEffect(() => {
    inputRef.current.focus();
  });

  const maxQuestionCharacter = process.env.REACT_APP_MAX_QUESTION_CHARACTER;

  const handleChange = e => {
    setInput(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const onSubmit = e => {
    e.preventDefault();  
    handleSubmit({     
      comment: input,     
    });
    setInput('');
  }

  return (
    <form  className='comment-form'>
          <textarea
            placeholder={placeHolderText}
            value={input}
            onChange={handleChange}
            name='textarea'
            rows="2"
            maxLength={maxQuestionCharacter}
            className='form-control '
            ref={inputRef}
          />
          <div className="text-sm text-color-gray">{characterCount}/{maxQuestionCharacter}</div>  
          <button onClick={onSubmit} disabled={isTextareaEmpty} className='btn-md btn btn-success'>
           {submitLabel}
          </button>
          {hasCancelButton && (
            <button
              type="button"
              className='btn-md btn btn-dark my-3 ms-3'
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
    </form>
  );
};

export default QuestionCommentForm;
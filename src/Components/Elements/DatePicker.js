import React from "react";
import { Form } from 'react-bootstrap';



const DatePicker = ({ name, label, placeholder, handler, required = false, locale, value }) => {      

  function subtractYears(date, years) {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  return (
    <Form.Group controlId="dob">
    <div className=" mb-3">
    <label className="form-label py-1"> {label}  
    {required === true && (   <span className="req"> *</span> ) }
    </label> 
    <div className="input-group mb-3">     
       <Form.Control 
        type="date" 
        name={name} 
        max={subtractYears(new Date(), 13).toISOString().split("T")[0]}
        min={subtractYears(new Date(), 100).toISOString().split("T")[0]}
        onChange={(e) => handler(e.target.value)}
        placeholder={placeholder}
        defaultValue={value}       
     />        
    </div>
    </div>
    </Form.Group>
  );
};

export default DatePicker;
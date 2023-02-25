/* eslint-disable no-useless-escape */
const isValidZip = (zip,locale) => {   
  let re = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);  
  if (locale === "pt_BR"){   
    re = new RegExp(/^\d{5}-?\d{3}$/);
  }   
  return re.test(zip) || zip.length===0;
};

export default isValidZip;
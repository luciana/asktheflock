const formatName = (name, maxChars) => {     
    if ( name.length > maxChars){
      return name.substring(0, maxChars-3)+'...';
    }else if ( name.length === maxChars){
      return name;
    }else{
     return name;
    }

  }

export default formatName;
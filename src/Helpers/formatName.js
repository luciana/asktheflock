const formatName = (name, maxChars) => {     
    if ( name && name.length > maxChars){
      return name.substring(0, maxChars-3)+'...';
    }else if ( name && name.length === maxChars){
      return name;
    }else if ( name ) {
     return name;
    }else {
      return "";
    }

  }

export default formatName;
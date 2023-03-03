/* eslint-disable no-useless-escape */
const isOwner = (e) => {
    const owners = process.env.REACT_APP_OWNERS;   
    return owners.includes(e);
  };

export { isOwner };
  
  
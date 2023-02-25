/* eslint-disable no-useless-escape */
const isOwner = (user) => {
    const owners = process.env.REACT_APP_OWNERS;
    return owners.includes(user.email);
  };

export { isOwner };
  
  
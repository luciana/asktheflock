
/* eslint-disable no-useless-escape */
const isValidPassword = (pwd) => {
    const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\-^$*.\[\]{}()?"!@#%&/\\,><':;|_~`])\S{8,99}$/);
  
  return re.test(pwd);
};

export default isValidPassword;
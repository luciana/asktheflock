
/* eslint-disable no-useless-escape */
const isValidPassword = (pwd) => {
  // Regular expression parts:
  // (?=.*[a-z])       : At least one lowercase character
  // (?=.*[A-Z])       : At least one uppercase character
  // (?=.*[0-9])       : At least one digit
  // (?=.*[!@#$%^&*])  : At least one special character
  // \S{8,99}          : At least 8 and at most 99 non-whitespace characters

  const re = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])\S{8,99}$/
  );

  return re.test(pwd);
};

export default isValidPassword;

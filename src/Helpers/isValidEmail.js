const isValidEmail = (email) => {
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/

  );
  const result = re.test(email);
  console.log(`${email}: ${result}`);
  return result;
};

export default isValidEmail;


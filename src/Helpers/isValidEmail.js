const isValidEmail = (email) => {
  const re = new RegExp(
    // ^: start of the line
    '^' +
    // [a-zA-Z0-9._%+-]+: one or more alphanumeric characters, '.', '_', '%', '+', or '-'
    '[a-zA-Z0-9._%+-]+' +
    // @: the '@' symbol
    '@' +
    // [a-zA-Z0-9.-]+: one or more alphanumeric characters, '.', or '-'
    '[a-zA-Z0-9.-]+' +
    // \.: a literal dot '.'
    '\\.' +
    // [a-zA-Z]{2,}: two or more alphabetic characters for the top-level domain
    '[a-zA-Z]{2,}' +
    // $: end of the line
    '$'
  );
  return re.test(email);
};

export default isValidEmail;

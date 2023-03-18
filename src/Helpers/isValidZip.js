const isValidZip = (zip, locale) => {
  // Dictionary to store regular expressions for different locales
  const zipRegexByLocale = {
    'en_US': /^[0-9]{5}(?:-[0-9]{4})?$/, // US zip codes: 12345 or 12345-6789
    'pt_BR': /^\d{5}-?\d{3}$/,           // Brazilian zip codes: 12345-678
  };

  // If the given locale is not in the dictionary, use a default regex
  const defaultRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

  // Select the appropriate regex for the given locale
  const regex = zipRegexByLocale[locale] || defaultRegex;

  // Test the zip code against the selected regex, or allow empty zip codes
  return regex.test(zip) || zip.length === 0;
};

export default isValidZip;

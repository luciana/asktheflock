import moment from "moment";


const FormatDate = (date, locale) => {
  return moment(date).locale(locale).format('L');
};


export default FormatDate;

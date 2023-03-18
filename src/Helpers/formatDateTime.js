import moment from 'moment-timezone';

const formatDateTime = (date_input, timezone) => {
  const date = moment(date_input).tz(timezone || moment.tz.guess());
  const hours = date.format('h');
  const minutes = date.format('mm');
  const ampm = date.format('a').toLowerCase();
  const formattedDate = date.format('M/D/YYYY [at] h:mm A');
  return `${formattedDate} (${moment.tz(moment.tz.guess()).zoneAbbr()})`;
};

export default formatDateTime;

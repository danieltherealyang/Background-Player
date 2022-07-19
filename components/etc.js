function getDateTime() {
  let current = new Date();
  let dateTime =
    current.getFullYear() + '-' + (current.getMonth() + 1).toString().padStart(2, 0) + '-' + current.getDate().toString().padStart(2, 0)
    + 'T'
    + current.getHours().toString().padStart(2, 0) + ":" + current.getMinutes().toString().padStart(2, 0) + ":" + current.getSeconds().toString().padStart(2, 0) + 'Z';
  return dateTime;
}

function getDiffStr(diff, singular, plural) {
  return diff + ' ' + ((diff == 1) ? singular : plural);
}

function getDateDiff(pastDate, presentDate) {
  if (pastDate[0] != presentDate[0])
    return getDiffStr(presentDate[0] - pastDate[0], 'year', 'years');
  else if (pastDate[1] != presentDate[1])
    return getDiffStr(presentDate[1] - pastDate[1], 'month', 'months');
  else if (parseInt((presentDate[2] - pastDate[2])/7))
    return getDiffStr(parseInt((presentDate[2] - pastDate[2])/7), 'week', 'weeks');
  else
    return getDiffStr(presentDate[2] - pastDate[2], 'day', 'days');
}

function getTimeDiff(pastTime, presentTime) {
  if (pastTime[0] != presentTime[0])
    return getDiffStr(presentTime[0] - pastTime[0], 'hour', 'hours');
  else if (pastTime[1] != presentTime[1])
    return getDiffStr(presentTime[1] - pastTime[1], 'minute', 'minutes');
  else
    return getDiffStr(presentTime[2] - pastTime[2], 'second', 'seconds');
}

function getDTdiff(past, present) {
  const pastDT = past.split(/[TZ]/);
  const presentDT = present.split(/[TZ]/);
  if (pastDT[0] == presentDT[0]) {
    let pastTime = pastDT[1].split(':');
    let presentTime = presentDT[1].split(':');
    return getTimeDiff(pastTime, presentTime);
  } else {
    let pastDate = pastDT[0].split('-');
    let presentDate = presentDT[0].split('-');
    return getDateDiff(pastDate, presentDate);
  }
}

function getShortNum(number) {
  if (number >= 1000000000)
    return parseInt(number/1000000000) + 'B';
  if (number >= 1000000)
    return parseInt(number/1000000) + 'M';
  if (number >= 1000)
    return parseInt(number/1000) + 'K';
  else
    return number;
}

const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function convertDate(date) {
  const dateArray = date.split('-');
  return months[parseInt(dateArray[1]) - 1] + ' ' + dateArray[2] + ', ' + dateArray[0];
}

export { getDateTime, getDTdiff, getShortNum, convertDate };
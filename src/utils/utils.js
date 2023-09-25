const localhost = 'http://192.168.2.5';

function toQuery(query={}) {
    var res = '?';
    for(var x in query) {    
        res += `${x}=${query[x]}&`
    }
    return res;
}

function formatDate(dateString) {
  let date = new Date(dateString),
      day = '' + date.getDate(),
      month = '' + (date.getMonth() + 1),
      year = date.getFullYear(),
      hour = '' + date.getHours(),
      minute = '' + date.getMinutes(),
      second = '' + date.getSeconds();


  if (day.length < 2) 
      day = '0' + day;
  if (month.length < 2) 
      month = '0' + month;
  if (hour.length < 2) 
      hour = '0' + hour;
  if (minute.length < 2) 
      minute = '0' + minute;
  if (second.length < 2) 
      second = '0' + second;

  return hour + ':' + minute + ':' + second + ' - ' + day + ':' + month + ':' + year;
}

export {formatDate, localhost, toQuery}
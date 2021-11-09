let isOlderThanGivenMonth = function(date, numberOfMonths) {
  let now = new Date();
  var year = now.getFullYear();
  if(now.getMonth() <= numberOfMonths-1) {
    year -= 1;
  }
  let month = (now.getMonth() + 12 - numberOfMonths)%12;

  let gmtTimeOffset = (month > 2 && month < 10) ? "2" : "1";

  let dateToCompare = Date.parse(year+"-"+(month < 9 ? "0" : "")+(month+1)+"-01T00:00:00+0"+gmtTimeOffset+"00");

  return (date - dateToCompare) < 0;
}

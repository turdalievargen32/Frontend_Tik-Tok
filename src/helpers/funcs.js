export const getDate = (given_date) => {
  const date = new Date(given_date);
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedDate = dd + '.' + mm + '.' + yyyy;
  return formattedDate
}

export const getDateAndTime = (given_date) => {
  const date = new Date(given_date);
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let hh = date.getHours();
  let mins = date.getMinutes();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (mins < 10) mins = '0' + mins;
  if (hh < 10) hh = '0' + hh;

  const formattedDate = hh + ':' + mins + ' - ' + dd + '.' + mm + '.' + yyyy;
  return formattedDate
}
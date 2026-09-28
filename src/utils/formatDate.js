export const isValidDate = (date) => {
  if (date === null || date === undefined) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export default (date) => {
  if (!isValidDate(date)) {
    // Generates YYYY-MM-DD string in local system time
    const localNow = new Date();
    const offsetDate = new Date(localNow.getTime() - localNow.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().split('T')[0];
  }

  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
};
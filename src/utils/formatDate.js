export const isValidDateInput = (date) => {
  if (!date) return false;
  const d = new Date(typeof date === 'string' ? date.replace(/-/g, '/') : date);
  return d instanceof Date && !isNaN(d.getTime());
};

export default (date) => {
  const cleanDate = typeof date === 'string' ? date.replace(/-/g, '/') : date;
  const d = new Date(cleanDate);

  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
};
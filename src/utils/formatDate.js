export default (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
  
    if (month.length < 2) { month = `0${month}`; }
    if (day.length < 2) { day = `0${day}`; }
  
    return [year, month, day].join('-');
  };
  

export const isEmpty = (value) => {
    return value === null ||
        value === undefined ||
        String(value).trim() === "";
};

export const capitalize = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const trimString = (value) => {
    return String(value).trim();
};
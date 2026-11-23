import logger from "./logger";

const parseRawDate = (date) => {
  try {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) throw new Error("Invalid date");
    return parsed;
  } catch (err) {
    logger.error("Date parse failed in helper", { reason: err.message });
    throw err;
  }
};

export default (date) => {
  console.log("here - formatting date");
  // console.log("Raw input date:", date);

  try {
    const d = parseRawDate(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    const formatted = [year, month, day].join("-");

    logger.info("done");
    logger.info("Date formatted", { formatted });
    logger.info("Date formatted", { formatted });

    return formatted;
  } catch (err) {
    logger.error("Date formatting failed at top level", { reason: err.message });
    return "";
  }
};
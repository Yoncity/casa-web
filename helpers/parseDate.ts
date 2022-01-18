import dayjs from "dayjs";

const parseDate = (dateToParse: string): dayjs.Dayjs => {
  const recordYear = Number(dateToParse.substring(0, 4));
  const recordMonth = Number(dateToParse.substring(4, 6));
  const recordDay = Number(dateToParse.substring(6));

  return dayjs(`${recordYear}-${recordMonth}-${recordDay}`);
};

export default parseDate;

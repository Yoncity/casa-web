import dayjs from "dayjs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import style from "./index.module.scss";

const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
  setShowDatePicker,
}) => {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getYear = (date: Date) => {
    return new Date(date).getFullYear();
  };

  const getMonth = (date: Date) => {
    return new Date(date).getMonth();
  };
  return (
    <div className={style.datepicker_container}>
      <DatePicker
        inline
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }: any) => (
          <div className={style.datepicker_container__header}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              className={style.datepicker_container__header__year}
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              className={style.datepicker_container__header__month}
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setShowDatePicker(false);
        }}
      />
    </div>
  );
};

export default CustomDatePicker;

import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const WeekdayCalculator = (props) => {
  const { startDate, endDate, country, totalFine, setTotalFine } = props;
  const [weekdayCount, setWeekdayCount] = useState(0);

  const calculateWeekdays = () => {
    let count = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (country === "SaudiArabia") {
        if (dayOfWeek !== 5 && dayOfWeek !== 6) {
          // 5 is Friday, 6 is Saturday for Saudi Arabia
          count++;
        }
      } else if (country === "Turkey") {
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          // 0 is Sunday, 6 is Saturday for Turkey
          count++;
        }
      }
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setWeekdayCount(count);
    if (count > 10) {
      setTotalFine((count - 10) * 5);
    } else {
      setTotalFine(count * 0);
    }
  };

  useEffect(() => {
    calculateWeekdays();
  }, [startDate, endDate, country]);

  return (
    <>
      <Text style={{ textAlign: "center" }}>
        Number of weekdays between the two dates in {country}: {weekdayCount}
      </Text>
      <Text style={{ textAlign: "center", color: "red" }}>
        Total fine is: {country === "Turkey" ? "₺" : "$"}
        {totalFine}
      </Text>
    </>
  );
};

export default WeekdayCalculator;

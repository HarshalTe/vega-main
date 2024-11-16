import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";

function Graph(props) {
  var startDate = moment().subtract(1, "months").format("YYYY-MM-DD");
  var endDate = moment().add(1, "day").format("YYYY-MM-DD");

  var enumerateDaysBetweenDates = function (startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf("day");
    var lastDate = moment(endDate).startOf("day");

    while (currDate.add(1, "days").diff(lastDate) < 0) {
      console.log(currDate.format("YYYY-MM-DD"));
      dates.push(currDate.clone().format("YYYY-MM-DD"));
    }

    return dates;
  };

  const dates = enumerateDaysBetweenDates(startDate, endDate);
  console.log("++++", dates.length);

  let lineData = {
    labels: dates.map((date) => date),
    // labels: [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "jul",
    //   "aug",
    //   "sep",
    //   "nov",
    // ],
    datasets: [
      {
        label: "First dataset",
        data: [
          33, 53, 85, 41, 44, 65, 105, 145, 100, 78, 102, 33, 53, 85, 41, 44,
          65, 105, 145, 100, 78, 102, 33, 53, 85, 41, 44, 65, 105, 145,
        ],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [
          33, 25, 35, 51, 54, 76, 78, 154, 26, 45, 12, 33, 25, 35, 51, 54, 76,
          78, 154, 26, 45, 12, 33, 25, 35, 51, 54, 76, 78, 154, 26, 45, 12, 33,
          25, 35, 51, 54, 76, 78, 154,
        ],
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "Thrid dataset",
        data: [
          33, 105, 2, 51, 59, 205, 47, 78, 95, 12, 14, 33, 105, 2, 51, 59, 205,
          47, 78, 95, 12, 14, 33, 105, 2, 51, 59, 205, 47, 78,
        ],
        fill: false,
        borderColor: "red",
        backgroundColor: "rgba(75,192,192,190)",
      },
    ],
  };
  return (
    <div className="app">
      {" "}
      <Line data={lineData} />
    </div>
  );
}

export default Graph;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";

import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";

import CircularProgress from "@material-ui/core/CircularProgress";
// import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import Chart from "chart.js/auto";

Chart.register(annotationPlugin);
function FinalReportVegaGraphHumidity(props) {
  // const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  // let data = {
  //   token: accessToken,
  //   id: param?.id,
  // };
  // const [showGraph, setShowGraph] = useState(false);
  const [chartData, setChartData] = useState({});

  // let graph = [];
  let graphdata = [];

  // let MinimumBoxY;

  let MaximumBoxY;
  // graph = props.tests?.tests;
  graphdata = props.tests?.tests
    ?.filter((t) => {
      if (props.testName.includes("WITHOUT AMBIENT")) {
        return !t?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase());
      } else return t;
    })
    .map((gd) => {
      return {
        label: gd.sensor,
        data: gd.data
          ?.filter((t) => t.test_type_id == props.test_id)
          .map((tem) => tem.humidity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],

        pointBorderWidth: 0,

        borderWidth: 1,
        tension: 0.4,
      };
    });
console.log("graphdata",graphdata)
  let minExcursionIndex = -1;
  let maxExcursionIndex = -1;
  let minRecoveryIndex = -1;
  let maxRecoveryIndex = -1;
  let humidity2 = [];
  let time = [];
  let humidity = [];

  for (const dataObj of props.tests?.tests) {
    dataObj?.data
      .filter((t) => t.test_type_id == props.test_id)
      .map((t) => {
        // time.push(t.time);
        time.push(t.filter_datetime);
        humidity.push(t.humidity);
        humidity2.push({ time: t.time, humidity: parseFloat(t.humidity) });
      });
  }

  MaximumBoxY = Math.max(...humidity);
  // MinimumBoxY = Math.min(...humidity);

  const uniqueTags = [];
  humidity2.map((item) => {
    var findItem = uniqueTags.find((x) => x.time === item.time);
    if (!findItem) uniqueTags.push(item);
  });
  // console.log(`humidity2`, humidity2);
  // console.log(`unique`, uniqueTags);

  if (
    uniqueTags.length ==
    time.filter((val, id, array) => array.indexOf(val) == id).length
  ) {
    let breakCondition = false;
    for (let i = 0; i < uniqueTags.length; i++) {
      const range = props.editcase?.max_operating_range;
      if (uniqueTags[i].humidity > range && breakCondition == false) {
        // console.log(`uniqueTags[i].humidity`, uniqueTags[i].humidity);
        minExcursionIndex = Number(i);
        breakCondition = true;
        // console.log(`minExcursionIndex`, minExcursionIndex);
      }
      // else {
      //   console.log(`else block`);
      //   // console.log(`uniqueTags[i].humidity`, uniqueTags[i].humidity);
      // }
    }
    if (minExcursionIndex == 0) {
      let breakCondition2 = false;
      for (let i = minExcursionIndex; i < uniqueTags.length; i++) {
        const range = props.editcase?.max_operating_range;
        if (uniqueTags[i].humidity <= range && breakCondition2 == false) {
          breakCondition2 = true;

          maxExcursionIndex = Number(i);
          minRecoveryIndex = Number(i);
        } else {
          maxExcursionIndex = Number(i);
          minRecoveryIndex = Number(i);
        }
        // else {
        //
        //   // console.log(`else block`);
        //   // console.log(`uniqueTags[i].humidity`, uniqueTags[i].humidity);
        // }
        // console.log(`maxExcursionIndex`, maxExcursionIndex);
        // console.log(`minRecoveryIndex`, minRecoveryIndex);
      }
      if (minRecoveryIndex > 0) {
        let breakCondition3 = false;
        for (let i = minRecoveryIndex; i < uniqueTags.length; i++) {
          const range = props.editcase?.max_operating_range;
          if (uniqueTags[i].humidity <= range - 1 && breakCondition3 == false) {
            // console.log("breakcondition", breakCondition3);

            breakCondition3 = true;
            // console.log("breakconditionsss:", breakCondition3);
            maxRecoveryIndex = Number(i);
          } else if (
            !(uniqueTags[i].humidity <= range - 1) &&
            breakCondition3 == false
          ) {
            maxRecoveryIndex = Number(i);
            // console.log(`else block maxRecoveryIndex`);
            // console.log(`uniqueTags[i].humidity`, uniqueTags[i].humidity);
          }

          // console.log(`maxRecoveryIndex`, maxRecoveryIndex);
        }
      }
    }
    if (minExcursionIndex > 0) {
      let breakCondition2 = false;
      for (let i = minExcursionIndex; i < uniqueTags.length; i++) {
        const range = props.editcase?.max_operating_range;
        if (uniqueTags[i].humidity <= range && breakCondition2 == false) {
          breakCondition2 = true;

          maxExcursionIndex = Number(i);
          minRecoveryIndex = Number(i);
        }
        // else {
        //   // console.log(`else block`);
        //   // console.log(`uniqueTags[i].humidity`, uniqueTags[i].humidity);
        // }
        // console.log(`maxExcursionIndex`, maxExcursionIndex);
        // console.log(`minRecoveryIndex`, minRecoveryIndex);
      }
      if (minRecoveryIndex > 0) {
        let breakCondition3 = false;
        for (let i = minRecoveryIndex; i < uniqueTags.length; i++) {
          const range = props.editcase?.max_operating_range;
          if (uniqueTags[i].humidity <= range - 1 && breakCondition3 == false) {
            // console.log("breakcondition", breakCondition3);

            breakCondition3 = true;
            // console.log("breakconditionsss:", breakCondition3);
            maxRecoveryIndex = Number(i);
          } else if (
            !(uniqueTags[i].humidity <= range - 1) &&
            breakCondition3 == false
          ) {
            maxRecoveryIndex = Number(i);
            // console.log(`else block maxRecoveryIndex`);
            // console.log(`uniqueTags[i].humidity`, uniqueTags[i].humidity);
          }

          // console.log(`maxRecoveryIndex`, maxRecoveryIndex);
        }
      }
    }
  }

  const footer = (tooltipItems) => {
    let xIndex = 0;

    tooltipItems.forEach(function (tooltipItem, index) {
      xIndex = tooltipItem.dataIndex;
    });
    return "Index: " + xIndex;
  };
  const Chart2 = () => {
    setChartData({
      datasets: graphdata,
      labels: time.filter((val, id, array) => array.indexOf(val) == id),
    });
  };

  useEffect(() => {
    Chart2();
  }, [(graphdata && props.tests?.tests?.length > 0) || minRecoveryIndex > 0]);

  const g = {
    labels: time.filter((val, id, array) => array.indexOf(val) == id),
    datasets: graphdata,
  };
  return (
    <Card className="p-3">
      {/* <Button
        className="btn-success"
        onClick={() => {
          Chart();
          setShowGraph(true);
        }}
      >
        Load Graph
      </Button> */}
      <CardBody className="p-0">
        <h6 className="text-center p-0">{props.testName}</h6>
        <p className="text-center p-1 m-0">TREND OF TEMPERATURE VS TIME</p>
        {props.tests.isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <CircularProgress color="secondary" />
          </div>
        ) : props.tests?.error || props.tests?.tests?.length == 0 ? (
          <span
            className="text-red text-center"
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
          >
            Data Not Found Please Upload Raw Data
          </span>
        ) : (
          <>
            {props.cases?.cases
              ?.filter((c) => c.id == param.id)
              .map((user) => {
                return (
                  <Line
                    style={{
                      maxHeight: `${
                        props.mxHeight ? props.mxHeight + "px" : "340px"
                      }`,
                      maxWidth: "1080px",
                    }}
                    // data={chartData}
                    data={g}
                    options={{
                      responsive: true,
                      //   title: { text: props.testName, display: true },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            footer: footer,
                          },
                        },
                        legend: {
                          display: true,
                          position: "bottom",

                          labels: {
                            boxHeight: 5,
                            boxWidth: 10,
                          },
                        },
                        autocolors: false,
                        annotation: {
                          annotations: {
                            line1: {
                              type: "line",
                              drawTime: "afterDatasetsDraw",
                              yMin: user.min_operating_range,
                              yMax: user.min_operating_range,
                              borderColor: "rgb(255, 99, 132)",
                              borderWidth: 2,
                              borderDash: [3],
                              borderDashOffset: 2,
                              label: {
                                content: `Minimum Temperature: ${user.min_operating_range}`,
                                enabled: true,
                                color:"black",
                                backgroundColor:"#00000030",
                                position: "end",
                              },
                            },
                            line2: {
                              type: "line",
                              drawTime: "afterDatasetsDraw",
                              yMin: user.max_operating_range,
                              yMax: user.max_operating_range,
                              borderColor: "red",
                              borderWidth: 2,
                              borderDash: [3],
                              borderDashOffset: 2,
                              label: {
                                content: `Maximum Temperature: ${user.max_operating_range}`,
                                color:"black",
                                backgroundColor:"#00000030",
                                enabled: true,
                                position: "end",
                              },
                            },
                            line3: {
                              type: "line",
                              drawTime: "afterDatasetsDraw",
                              xMin: Number(props.x_min_excersion) ?? 0,
                              xMax: Number(props.x_min_excersion) ?? 0,
                              borderColor: "red",
                              borderWidth: 0,
                              borderDash: [3],
                              borderDashOffset: 2,
                              // label: {
                              //   content: `Excursion Period`,

                              //   enabled: true,
                              //   position: "start",
                              //   xAdjust: 55,
                              //   yAdjust: 5,
                              // },
                            },
                            line4: {
                              type: "line",
                              drawTime: "afterDatasetsDraw",
                              xMin: Number(props.x_min_recovery) ?? 0,
                              xMax: Number(props.x_min_recovery) ?? 0,
                              borderColor: "red",
                              borderWidth: 0,
                              borderDash: [3],
                              borderDashOffset: 2,
                              // label: {
                              //   content: `Recovery Period`,

                              //   enabled: true,
                              //   position: "start",
                              //   xAdjust: 55,
                              //   yAdjust: 30,
                              // },
                            },
                            // box1: {
                            //   type: "box",
                            //   xMin: Number(props.x_min_excersion) ?? "",
                            //   xMax: Number(props.x_max_excersion) ?? "",
                            //   // yMin: Number(props.y_min_excersion) ?? "",
                            //   // yMax: Number(props.y_max_excersion) ?? "",
                            //   backgroundColor: "rgba(173, 255, 245, 0.25)",
                            //   borderWidth: 2,
                            //   borderColor: "red",
                            //   borderDash: [3],
                            //   borderDashOffset: 2,
                            //   // label: {
                            //   //   content: "Excursion Period",
                            //   //   enabled: true,
                            //   //   position: "center",
                            //   // },
                            // },
                            // box2: {
                            //   type: "box",
                            //   xMin: Number(props.x_min_recovery) ?? "",
                            //   xMax: Number(props.x_max_recovery) ?? "",
                            //   // yMin: Number(props.y_min_recovery) ?? "",
                            //   // yMax: Number(props.y_max_recovery) ?? "",
                            //   backgroundColor: "rgba(255, 198, 145, 0.25)",
                            //   borderColor: "blue",
                            //   borderDash: [3],
                            //   borderDashOffset: 2,
                            //   // label: {
                            //   //   content: "Recovery Period",
                            //   //   enabled: true,
                            //   //   position: "center",
                            //   // },
                            // },
                          },
                        },
                      },
                    }}
                  />
                );
              })}
          </>
        )}
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    tests: state.tests,
  };
};

export default connect(mapStateToProps)(FinalReportVegaGraphHumidity);

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from "reactstrap";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import CircularLoader from "../../loader/CircularLoader";
// import { CategoryScale, LinearScale } from "chart.js";
// import { Chart } from "chart.js";

// Chart.register(CategoryScale);
// Chart.register(LinearScale);
//Line chart

// let lineData = {
//   labels: [1, 2, 3, 4, 5, 6, 7, 8],
//   datasets: [
//     {
//       label: "Income",
//       borderWidth: 1,
//       backgroundColor: "rgba(94,114,228,.1)",
//       borderColor: "rgb(94,114,228)",
//       pointBorderColor: "rgb(94,114,228)",
//       pointBackgroundColor: "rgb(94,114,228)",
//       data: [0, 15, 6, 11, 25, 9, 18, 24],
//     },
//     {
//       label: "Outcome",
//       borderWidth: 1,
//       backgroundColor: "rgba(79,195,247,.1)",
//       borderColor: "rgb(79,195,247)",
//       pointBorderColor: "rgb(79,195,247)",
//       pointBackgroundColor: "rgb(79,195,247)",
//       data: [0, 8, 11, 22, 8, 10, 5, 21],
//     },
//   ],
// };

function BookingSummary(props) {
  const [chartData, setChartData] = useState([]);

  function chart() {
    let labels = [];
    let gdata = [];
    const newData = props.data?.length > 0 ? props.data : [];
    for (const d of newData) {
      labels.push(d.created_date);
      gdata.push(d.count);
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Count",
          borderWidth: 1,
          backgroundColor: "rgba(94,114,228,.1)",
          borderColor: "rgb(94,114,228)",
          pointBorderColor: "rgb(94,114,228)",
          pointBackgroundColor: "rgb(94,114,228)",
          data: gdata,
        },
      ],
    });

    console.log(`labels`, labels, "gdata", gdata);
  }

  useEffect(() => {
    chart();
  }, [props.data]);

  console.log("labels", chartData);
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <CardTitle>{props.title}</CardTitle>
            <CardSubtitle>{props.subtitle}</CardSubtitle>
          </div>
          {/* <div className="ml-auto d-flex align-items-center">
							<ul className="list-inline font-12 dl mr-3 mb-0">
								<li className="border-0 p-0 text-info list-inline-item">
									<i className="fa fa-circle"></i> Iphone
								</li>
								<li className="border-0 p-0 text-primary list-inline-item">
									<i className="fa fa-circle"></i> Ipad
								</li>
							</ul>
						</div> */}
        </div>
        <Row>
          <Col lg="12">
            <div className="campaign ct-charts">
              <div
                className="chart-wrapper"
                style={{ width: "100%", margin: "0 auto", height: 250 }}
              >
                {props.loading ? (
                  <div
                    style={{
                      position: "relative",
                      top: "40%",
                      left: "40%",
                    }}
                  >
                    <CircularLoader color="primary" />
                  </div>
                ) : (
                  <Line
                    data={chartData}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                        labels: { fontFamily: "Nunito Sans" },
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: true,
                            gridLines: { display: true },
                            ticks: {
                              beginAtZero: true,
                              fontFamily: "Nunito Sans",
                            },
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: { display: true },
                            ticks: { fontFamily: "Nunito Sans" },
                          },
                        ],
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default BookingSummary;

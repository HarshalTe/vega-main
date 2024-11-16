import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import * as actions from "../../../redux/action";

import { connect } from "react-redux";

import { Pie } from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";

const PieGraph = (props) => {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: 1,
  };

  useEffect(() => {
    props.onTestsGetData(data);
  }, []);
  const [showGraph, setShowGraph] = useState(false);
  const [chartData, setChartData] = useState({});
  let graph = [];
  let graphdata = [];
  graph = props.tests?.tests;
  graphdata = props.tests?.tests
    ?.filter((gd) => gd.sensor == 260)
    .map((gd) => {
      return {
        label: gd.sensor,
        data: gd.data
          ?.filter((t) => t.test_type_id == 5)
          .map((tem) => tem.temp),
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

        borderWidth: 1,
      };
    });

  const Chart = () => {
    let time = [];
    let temp = [];
    let sensors = [];
    console.log("Chart Function");
    for (const dataObj of graph) {
      dataObj?.data
        .filter((t) => t.test_type_id == 5)
        .map((t) => {
          time.push(t.time);
        });
      // temp.push(parseInt(dataObj?.temp));
      sensors.push(dataObj?.sensor);
    }

    console.log("time", time);
    setChartData({
      labels: time.filter((val, id, array) => array.indexOf(val) == id),
      datasets: graphdata,
    });
  };
  useEffect(() => {
    Chart();
  }, [graphdata && props.tests?.tests?.length > 0]);
  return (
    <Card className="p-3">
      <Button
        className="btn-success"
        onClick={() => {
          Chart();
          setShowGraph(true);
        }}
      >
        Load Graph
      </Button>
      <CardBody className="p-0">
        <h3 className="text-center pt-4 pr-4 pl-4 pb-1 ">Sensor Data</h3>
        <h5 className="text-center p-3">TREND OF TEMPERATURE VS TIME</h5>
        {props.tests.isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <CircularProgress color="secondary" />
          </div>
        ) : props.tests?.error ? (
          <span
            className="text-red text-center"
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
          >
            Data Not Found Please Upload Raw Data
          </span>
        ) : (
          <Pie
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Sensor Data", display: true },
              scales: {
                yAxes: {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              },
            }}
          />
        )}
      </CardBody>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    lead: state.lead.lead,
    tests: state.tests,
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTestsGetData: (data) => dispatch(actions.testsGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PieGraph);

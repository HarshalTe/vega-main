import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import "../../assets/css/datatable.css";
import BookingSummary from "../../components/dashboard-components/booking-summary/booking-summary";
import Feeds from "../../components/dashboard-components/feeds/feeds";
import { baseUrl } from "../../shared/baseUrl";
import Top from "./Top";
import customerDashboard from "../../assets/vaga-images/customerDashboard.jpg";

function Starter(props) {
  const [dailyCase, setDailyCase] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = `${props.login?.login?.token}`;
  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    authAxios
      .get("/dailycase")
      .then((res) => {
        setDailyCase(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error of Stats", err);
      });
  }, []);

  console.log(`dailycase`, dailyCase);

  if (props.login?.login?.user) {
    return (
      <div>
        <Row>
          <Col sm={6} lg={4}>
            {/* <Feeds /> */}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Top />
          </Col>
        </Row>
        <Row>
          <Col sm={4} lg={4}>
            <BookingSummary
              title="Quotation Summary"
              subtitle="Summary of the month"
              data={dailyCase}
              loading={loading}
            />
          </Col>
          <Col sm={4} lg={4}>
            <BookingSummary
              title="Invoice Summary"
              subtitle="Summary of the month"
              data={dailyCase}
              loading={loading}
            />
          </Col>
          <Col sm={4} lg={4}>
            <BookingSummary
              title="Cases Summary"
              subtitle="Summary of the month"
              data={dailyCase}
              loading={loading}
            />
          </Col>
        </Row>
      </div>
    );
  } else if (props.login?.login?.customer) {
    return (
      <div>
        {/* <Row>
            <Col sm={6} lg={8}>
              <BookingSummary />
            </Col>
            <Col sm={6} lg={4}>
              <Feeds />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Top />
            </Col>
          </Row>
          <Row>
            <Col sm={12}></Col>
          </Row> */}
          <img style={{"width":"-webkit-fill-available"}} src={customerDashboard}></img>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases.cases,
    editcase: state.cases.editcase,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
  };
};

export default connect(mapStateToProps)(Starter);

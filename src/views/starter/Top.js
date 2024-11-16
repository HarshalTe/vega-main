import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Loader from "../../components/loader/Loader";
import Loader2 from "../../components/loader/Loader2";
import { baseUrl } from "../../shared/baseUrl";

function Top(props) {
  const [stats, setStats] = useState([]);
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
      .get("/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error of Stats", err.response);
      });
  }, []);

  console.log(`stats`, stats);
  return (
    <div className="row">
      {/* <div className="col-sm-12 col-md-3 col-lg-3">
          <Card outline color="success">
            <CardHeader className="bg-warning text-white">
              <h3 className="mb-0">Customer Count</h3>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">18</h2>
            </CardBody>
            <CardFooter>No of Customers</CardFooter>
          </Card>
        </div> */}
      <div className="col-sm-12 col-md-3 col-lg-3">
        <Card>
          <CardHeader className="bg-danger text-white">
            <h3 className="mb-0">Invoice Count</h3>
          </CardHeader>
          <CardBody>
            {loading ? <Loader /> : <h2 className="mb-0">5</h2>}
          </CardBody>

          <CardFooter>No of Invoice Count</CardFooter>
        </Card>
      </div>
      <div className="col-sm-12 col-md-3 col-lg-3">
        <Card>
          <CardHeader className="bg-info text-white">
            <h3 className="mb-0">Ongoing Cases</h3>
          </CardHeader>
          <CardBody>
            {loading ? <Loader /> : <h2 className="mb-0">{stats?.inComp}</h2>}
          </CardBody>
          <CardFooter>No of Ongoing Cases</CardFooter>
        </Card>
      </div>
      <div className="col-sm-12 col-md-3 col-lg-3">
        <Card>
          <CardHeader className="bg-warning text-white">
            <h3 className="mb-0">Completed Cases</h3>
          </CardHeader>
          <CardBody>
            {loading ? <Loader /> : <h2 className="mb-0">{stats?.comp}</h2>}
          </CardBody>
          <CardFooter>No of Completed Cases</CardFooter>
        </Card>
      </div>
      <div className="col-sm-12 col-md-3 col-lg-3">
        <Card>
          <CardHeader className="bg-danger  text-white">
            <h3 className="mb-0">Total Cases</h3>
          </CardHeader>
          <CardBody>
            {loading ? <Loader /> : <h2 className="mb-0">{stats?.total}</h2>}
          </CardBody>
          <CardFooter>No of Total Cases</CardFooter>
        </Card>
      </div>
      {/* <div className="col-sm-12 col-md-3 col-lg-3">
          <Card>
            <CardHeader className="bg-success text-white">
              <h3 className="mb-0">User Count</h3>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">3</h2>
            </CardBody>
            <CardFooter>No of Users</CardFooter>
          </Card>
        </div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    testType: state.testType,
    editcase: state.cases.editcase,
    tests: state.tests,
  };
};

export default connect(mapStateToProps)(Top);

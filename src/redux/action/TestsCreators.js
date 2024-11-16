import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const testsSetData = (tests) => {
  return {
    type: actionType.TESTS_SET_DATA,
    tests: tests,
  };
};

export const testsFailData = (error) => {
  return {
    type: actionType.TESTS_FAIL_DATA,
    error: error,
  };
};
export const testsLoading = () => {
  return {
    type: actionType.TESTS_LOADING,
  };
};
export const testsGetData = (data) => {
  return (dispatch) => {
    dispatch(testsLoading());
    axios
      .get(baseUrl + `tests/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(testsSetData(res.data));

        console.log("graph data", res.data);
      })

      .catch((error) => dispatch(testsFailData(error)));
  };
};

// export const testReportData = (data) => {
//   return (dispatch) => {
//     dispatch(testsLoading());
//     axios
//       .get(baseUrl + "getTemp", {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + data.token,
//         },
//       })
//       .then((res) => {
//         dispatch(testsEditSetData(res.data));

//         console.log("response data", res.data);
//       })

//       .catch((error) => dispatch(testsEditFailData(error)));
//   };
// };

export const testsEditSetData = (parameterData) => {
  return {
    type: actionType.TESTS_EDIT_SET_DATA,
    parameterData: parameterData,
  };
};

export const testsEditFailData = (error) => {
  return {
    type: actionType.TESTS_EDIT_FAIL_DATA,
    error: error,
  };
};

export const testsEditGetData = (data) => {
  return (dispatch) => {
    dispatch(testsLoading());
    axios
      .get(baseUrl + `getTemp/${data?.id}/${data?.testId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(testsEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(testsEditFailData(error)));
  };
};

export const deleteTestsFail = (error) => {
  return {
    type: actionType.DELETE_TESTS_FAIL,
    error: error,
  };
};

export const deleteTests = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `tests/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted  Tests!").then(() => {
            dispatch(testsGetData(data));
          });
        })
        .catch((error) => dispatch(deleteTestsFail(error)));
    }
  };
};

export const postTestsDataStart = () => {
  return {
    type: actionType.POST_TESTS_DATA_START,
  };
};

export const postTestsDataFail = (error) => {
  return {
    type: actionType.POST_TESTS_DATA_FAIL,
    error: error,
  };
};

export const postTestsData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postTestsDataStart());

    axios
      .post(baseUrl + "tests", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created  Tests!").then(() => {
          dispatch(testsGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postTestsDataFail(error));
      });
  };
};

export const updateTestsDataStart = () => {
  return {
    type: actionType.UPDATE_TESTS_DATA_START,
  };
};

export const updateTestsData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateTestsDataStart());

    axios
      .post(baseUrl + `tests/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated  Tests!").then(() => {
          toggle();
          dispatch(testsGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

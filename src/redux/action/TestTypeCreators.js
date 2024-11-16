import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const testTypeSetData = (testType) => {
  return {
    type: actionType.TEST_TYPE_SET_DATA,
    testType: testType,
  };
};

export const testTypeFailData = (error) => {
  return {
    type: actionType.TEST_TYPE_FAIL_DATA,
    error: error,
  };
};
export const testTypeLoading = () => {
  return {
    type: actionType.TEST_TYPE_LOADING,
  };
};
export const testTypeGetData = (data) => {
  return (dispatch) => {
    dispatch(testTypeLoading());
    axios
      .get(baseUrl + "testtypes", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(testTypeSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(testTypeFailData(error)));
  };
};

export const testTypeEditSetData = (editcase) => {
  return {
    type: actionType.TEST_TYPE_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const testTypeEditFailData = (error) => {
  return {
    type: actionType.TEST_TYPE_EDIT_FAIL_DATA,
    error: error,
  };
};

export const testTypeEditGetData = (data) => {
  return (dispatch) => {
    dispatch(testTypeLoading());
    axios
      .get(baseUrl + `testtypes/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(testTypeEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(testTypeEditFailData(error)));
  };
};

export const deleteTestTypeFail = (error) => {
  return {
    type: actionType.DELETE_TEST_TYPE_FAIL,
    error: error,
  };
};

export const deleteTestType = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `testtypes/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Test Cycle!").then(() => {
            dispatch(testTypeGetData(data));
          });
        })
        .catch((error) => dispatch(deleteTestTypeFail(error)));
    }
  };
};

export const postTestTypeDataStart = () => {
  return {
    type: actionType.POST_TEST_TYPE_DATA_START,
  };
};

export const postTestTypeDataFail = (error) => {
  return {
    type: actionType.POST_TEST_TYPE_DATA_FAIL,
    error: error,
  };
};

export const postTestTypeData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postTestTypeDataStart());

    axios
      .post(baseUrl + "testtypes", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Test Cycle!").then(() => {
          dispatch(testTypeGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postTestTypeDataFail(error));
      });
  };
};

export const updateTestTypeDataStart = () => {
  return {
    type: actionType.UPDATE_TEST_TYPE_DATA_START,
  };
};

export const updateTestTypeData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateTestTypeDataStart());

    axios
      .post(baseUrl + `testtypes/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Test Cycle!").then(() => {
          toggle();
          dispatch(testTypeGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

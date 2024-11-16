import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";
import { casesEditGetData, casesGetData } from "./CasesCreator";

export const calibrationSetData = (calibration) => {
    return {
      type: actionType.CALIBRATION_SET_DATA,
      calibration: calibration,
    };
  };
  
  export const calibrationFailData = (error) => {
    return {
      type: actionType.CALIBRATION_FAIL_DATA,
      error: error,
    };
  };
  export const calibrationLoading = () => {
    return {
      type: actionType.CALIBRATION_LOADING,
    };
  };
  export const calibrationGetData = (data) => {
    return (dispatch) => {
      dispatch(calibrationLoading());
      axios
        .get(baseUrl + "data-logger-two", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        })
        .then((res) => {
          dispatch(calibrationSetData(res.data));
  
          console.log("response data", res.data);
        })
  
        .catch((error) => dispatch(calibrationFailData(error)));
    };
  };


  export const postCalibrationDataStart = () => {
    return {
      type: actionType.POST_CALIBRATION_DATA_START,
    };
  };
  
  export const postCalibrationDataFail = (error) => {
    return {
      type: actionType.POST_CALIBRATION_DATA_FAIL,
      error: error,
    };
  };
  
  export const postCalibrationData = (data, user, toggle) => {
    return (dispatch) => {
      dispatch(postCalibrationDataStart());
  
      axios
        .post(baseUrl + "data-logger-two", user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Created Mapping Calibration!").then(() => {
            dispatch(calibrationGetData(data));
            toggle();
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch(postCalibrationDataFail(error));
        });
    };
  };
  export const postCalibrationDudupe = (data, user, toggle) => {
    return (dispatch) => {
      dispatch(postCalibrationDataStart());
  
      axios
        .post(baseUrl + "data-logger-two", user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Created Mapping Calibration!").then(() => {
            dispatch(calibrationGetData(data));
            // toggle();
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch(postCalibrationDataFail(error));
        });
    };
  };
  

  export const deleteCalibrationFail = (error) => {
    return {
      type: actionType.DELETE_CALIBRATION_FAIL,
      error: error,
    };
  };
  
  export const deleteCalibration = (data, user_id) => {
    return (dispatch) => {
      if (user_id) {
        axios
          .delete(baseUrl + `data-logger-two/${user_id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + data?.token,
            },
          })
          .then(() => {
            console.log("swal");
            swal("Successfully Deleted Mapping Calibration!").then(() => {
              dispatch(calibrationGetData(data));
            });
          })
          .catch((error) => dispatch(deleteCalibrationFail(error)));
      }
    };
  };

  export const updateCalibrationDataStart = () => {
    return {
      type: actionType.UPDATE_CALIBRATION_DATA_START,
    };
  };
  
  export const updateCalibration = (data, user, toggle) => {
    return (dispatch) => {
      dispatch(updateCalibrationDataStart());
  
      axios
        .post(baseUrl + `data-logger-two/${data.id}?_method=PUT`, user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Updated Mapping Calibration!").then(() => {
            toggle();
            dispatch(calibrationGetData(data));
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
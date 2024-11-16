import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const sensorSetData = (sensor) => {
  return {
    type: actionType.SENSOR_SET_DATA,
    sensor: sensor,
  };
};

export const sensorFailData = (error) => {
  return {
    type: actionType.SENSOR_FAIL_DATA,
    error: error,
  };
};
export const sensorLoading = () => {
  return {
    type: actionType.SENSOR_LOADING,
  };
};
export const sensorGetData = (data) => {
  return (dispatch) => {
    dispatch(sensorLoading());
    axios
      .get(baseUrl + "sensors", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(sensorSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(sensorFailData(error)));
  };
};

export const sensorEditSetData = (editsensor) => {
  return {
    type: actionType.SENSOR_EDIT_SET_DATA,
    editsensor: editsensor,
  };
};

export const sensorEditFailData = (error) => {
  return {
    type: actionType.SENSOR_EDIT_FAIL_DATA,
    error: error,
  };
};

export const sensorEditGetData = (data) => {
  return (dispatch) => {
    dispatch(sensorLoading());
    axios
      .get(baseUrl + `case-sensors/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(sensorEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(sensorEditFailData(error)));
  };
};

export const deleteSensorFail = (error) => {
  return {
    type: actionType.DELETE_SENSOR_FAIL,
    error: error,
  };
};

export const deleteSensor = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `sensors/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Sensor!").then(() => {
            dispatch(sensorGetData(data));
          });
        })
        .catch((error) => dispatch(deleteSensorFail(error)));
    }
  };
};

export const postSensorDataStart = () => {
  return {
    type: actionType.POST_SENSOR_DATA_START,
  };
};

export const postSensorDataFail = (error) => {
  return {
    type: actionType.POST_SENSOR_DATA_FAIL,
    error: error,
  };
};

export const postSensorData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postSensorDataStart());

    axios
      .post(baseUrl + "sensors", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Sensor!").then(() => {
          dispatch(sensorGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postSensorDataFail(error));
      });
  };
};

export const updateSensorDataStart = () => {
  return {
    type: actionType.UPDATE_SENSOR_DATA_START,
  };
};

export const updateSensorData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateSensorDataStart());

    axios
      .post(baseUrl + `sensors/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Sensor!").then(() => {
          toggle();
          dispatch(sensorGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

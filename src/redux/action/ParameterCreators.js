import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const parameterSetData1 = (parameter) => {
  return {
    type: actionType.PARAMETER_SET_DATA1,
    parameter: parameter,
  };
};
export const parameterSetData2 = (parameter) => {
  return {
    type: actionType.PARAMETER_SET_DATA2,
    parameter: parameter,
  };
};
export const parameterSetData3 = (parameter) => {
  return {
    type: actionType.PARAMETER_SET_DATA3,
    parameter: parameter,
  };
};
export const parameterSetDataHumidity = (parameter) => {
  return {
    type: actionType.PARAMETER_SET_DATA_HUMIDITY,
    parameter: parameter,
  };
};

export const parameterFailData1 = (error) => {
  return {
    type: actionType.PARAMETER_FAIL_DATA1,
    error: error,
  };
};
export const parameterLoading1 = () => {
  return {
    type: actionType.PARAMETER_LOADING1,
  };
};
export const parameterFailData2 = (error) => {
  return {
    type: actionType.PARAMETER_FAIL_DATA2,
    error: error,
  };
};
export const parameterLoading2 = () => {
  return {
    type: actionType.PARAMETER_LOADING2,
  };
};
export const parameterFailData3 = (error) => {
  return {
    type: actionType.PARAMETER_FAIL_DATA3,
    error: error,
  };
};
export const parameterLoading3 = () => {
  return {
    type: actionType.PARAMETER_LOADING3,
  };
};
export const parameterFailDataHumidity = (error) => {
  return {
    type: actionType.PARAMETER_FAIL_DATA_HUMIDITY,
    error: error,
  };
};
export const parameterLoadingHumidity = () => {
  return {
    type: actionType.PARAMETER_LOADING_HUMIDITY,
  };
};


export const parameterGetData1 = (data) => {
  return (dispatch) => {
    dispatch(parameterLoading1());
    axios
      .get(baseUrl + `getTemp/${data?.id}/${data?.testId1}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(parameterSetData1(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(parameterFailData1(error)));
  };
};
export const parameterGetData2 = (data) => {
  return (dispatch) => {
    dispatch(parameterLoading2());
    axios
      .get(baseUrl + `getTemp/${data?.id}/${data?.testId2}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(parameterSetData2(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(parameterFailData2(error)));
  };
};
export const parameterGetData3 = (data) => {
  return (dispatch) => {
    dispatch(parameterLoading3());
    axios
      .get(baseUrl + `getTemp/${data?.id}/${data?.testId3}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(parameterSetData3(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(parameterFailData3(error)));
  };
};
export const parameterGetDataHumidity = (data) => {
  return (dispatch) => {
    dispatch(parameterLoadingHumidity());
    axios
      .get(baseUrl + `getHumidity/${data?.id}/${data?.testId1}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(parameterSetDataHumidity(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(parameterFailDataHumidity(error)));
  };
};
import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const rowsSetData = (rows) => {
  return {
    type: actionType.ROWS_SET_DATA,
    rows: rows,
  };
};

export const rowsFailData = (error) => {
  return {
    type: actionType.ROWS_FAIL_DATA,
    error: error,
  };
};

export const rowsLoading = () => {
  return {
    type: actionType.ROWS_LOADING,
  };
};

export const rowsGetData = (data) => {
  return (dispatch) => {
    dispatch(rowsLoading());

    axios
      .get(baseUrl + "colrows", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(rowsSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(rowsFailData(error)));
  };
};

export const deleteRowsFail = (error) => {
  return {
    type: actionType.DELETE_ROWS_FAIL,
    error: error,
  };
};

export const deleteRows = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `colrows/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Rows!").then(() => {
            dispatch(rowsGetData(data));
          });
        })
        .catch((error) => dispatch(deleteRowsFail(error)));
    }
  };
};

export const postRowsDataStart = () => {
  return {
    type: actionType.POST_ROWS_DATA_START,
  };
};

export const postRowsDataFail = (error) => {
  return {
    type: actionType.POST_ROWS_DATA_FAIL,
    error: error,
  };
};

export const postRowsData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postRowsDataStart());

    axios
      .post(baseUrl + "colrows", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Rows!").then(() => {
          dispatch(rowsGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postRowsDataFail(error));
      });
  };
};

export const updateRowsDataStart = () => {
  return {
    type: actionType.UPDATE_ROWS_DATA_START,
  };
};

export const updateRowsData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateRowsDataStart());

    axios
      .post(baseUrl + `colrows/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Rows!").then(() => {
          toggle();
          dispatch(rowsGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

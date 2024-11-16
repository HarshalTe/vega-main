import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const colsSetData = (cols) => {
  return {
    type: actionType.COLS_SET_DATA,
    cols: cols,
  };
};

export const colsFailData = (error) => {
  return {
    type: actionType.COLS_FAIL_DATA,
    error: error,
  };
};
export const colsLoading = () => {
  return {
    type: actionType.COLS_LOADING,
  };
};
export const colsGetData = (data) => {
  return (dispatch) => {
    dispatch(colsLoading());
    axios
      .get(baseUrl + "cols", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(colsSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(colsFailData(error)));
  };
};

export const deleteColsFail = (error) => {
  return {
    type: actionType.DELETE_COLS_FAIL,
    error: error,
  };
};

export const deleteCols = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `cols/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Cols!").then(() => {
            dispatch(colsGetData(data));
          });
        })
        .catch((error) => dispatch(deleteColsFail(error)));
    }
  };
};

export const postColsDataStart = () => {
  return {
    type: actionType.POST_COLS_DATA_START,
  };
};

export const postColsDataFail = (error) => {
  return {
    type: actionType.POST_COLS_DATA_FAIL,
    error: error,
  };
};

export const postColsData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postColsDataStart());

    axios
      .post(baseUrl + "cols", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Cols!").then(() => {
          dispatch(colsGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postColsDataFail(error));
      });
  };
};

export const updateColsDataStart = () => {
  return {
    type: actionType.UPDATE_COLS_DATA_START,
  };
};

export const updateColsData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateColsDataStart());

    axios
      .post(baseUrl + `cols/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Cols!").then(() => {
          toggle();
          dispatch(colsGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

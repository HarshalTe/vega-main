import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const fileSetData = (file) => {
  return {
    type: actionType.FILE_SET_DATA,
    file: file,
  };
};

export const fileFailData = (error) => {
  return {
    type: actionType.FILE_FAIL_DATA,
    error: error,
  };
};
export const fileLoading = () => {
  return {
    type: actionType.FILE_LOADING,
  };
};
export const fileGetData = (data) => {
  return (dispatch) => {
    dispatch(fileLoading());
    axios
      .get(baseUrl + "files", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(fileSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(fileFailData(error)));
  };
};

export const fileEditSetData = (editcase) => {
  return {
    type: actionType.FILE_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const fileEditFailData = (error) => {
  return {
    type: actionType.FILE_EDIT_FAIL_DATA,
    error: error,
  };
};

export const fileEditGetData = (data) => {
  return (dispatch) => {
    dispatch(fileLoading());
    axios
      .get(baseUrl + `files/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(fileEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(fileEditFailData(error)));
  };
};

export const deleteFileFail = (error) => {
  return {
    type: actionType.DELETE_FILE_FAIL,
    error: error,
  };
};

export const deleteFile = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `files/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted File!").then(() => {
            dispatch(fileGetData(data));
          });
        })
        .catch((error) => dispatch(deleteFileFail(error)));
    }
  };
};

export const postFileDataStart = () => {
  return {
    type: actionType.POST_FILE_DATA_START,
  };
};

export const postFileDataFail = (error) => {
  return {
    type: actionType.POST_FILE_DATA_FAIL,
    error: error,
  };
};

export const postFileData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postFileDataStart());

    axios
      .post(baseUrl + "files", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created File!").then(() => {
          dispatch(fileGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postFileDataFail(error));
      });
  };
};

export const updateFileDataStart = () => {
  return {
    type: actionType.UPDATE_FILE_DATA_START,
  };
};

export const updateFileData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateFileDataStart());

    axios
      .post(baseUrl + `files/1?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated File!").then(() => {
          toggle();
          dispatch(fileGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

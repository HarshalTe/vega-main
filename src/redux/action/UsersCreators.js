import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const usersSetData = (users) => {
  return {
    type: actionType.USERS_SET_DATA,
    users: users,
  };
};

export const usersFailData = (error) => {
  return {
    type: actionType.USERS_FAIL_DATA,
    error: error,
  };
};
export const usersLoading = () => {
  return {
    type: actionType.USERS_LOADING,
  };
};
export const usersGetData = (data) => {
  return (dispatch) => {
    dispatch(usersLoading());
    axios
      .get(baseUrl + "users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(usersSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(usersFailData(error)));
  };
};

export const deleteUsersFail = (error) => {
  return {
    type: actionType.DELETE_USERS_FAIL,
    error: error,
  };
};

export const deleteUsers = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `users/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Users!").then(() => {
            dispatch(usersGetData(data));
          });
        })
        .catch((error) => dispatch(deleteUsersFail(error)));
    }
  };
};

export const postUsersDataStart = () => {
  return {
    type: actionType.POST_USERS_DATA_START,
  };
};

export const postUsersDataFail = (error) => {
  return {
    type: actionType.POST_USERS_DATA_FAIL,
    error: error,
  };
};

export const postUsersData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postUsersDataStart());

    axios
      .post(baseUrl + "users", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Users!").then(() => {
          dispatch(usersGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postUsersDataFail(error));
      });
  };
};

export const updateUsersDataStart = () => {
  return {
    type: actionType.UPDATE_USERS_DATA_START,
  };
};

export const updateUsersData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateUsersDataStart());

    axios
      .post(baseUrl + `users/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Users!").then(() => {
          toggle();
          dispatch(usersGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

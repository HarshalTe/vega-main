import * as ActionTypes from "./ActionTypes";
import Swal from "sweetalert2";
import { baseUrl } from "../../shared/baseUrl";
// import history from "../../myCreatedHistory";

export const updateSetData = (update) => {
  return {
    type: ActionTypes.UPDATE_PASSWORD_SET_DATA,
    update: update,
  };
};
export const updateFailData = (error) => {
  return {
    type: ActionTypes.UPDATE_PASSWORD_FAIL_DATA,
    error: error,
  };
};
//loading
export const updateLoading = () => {
  return {
    type: ActionTypes.UPDATE_PASSWORD_LOADING,
  };
};
//Add new code
export const updatePassword = (data, token, toggle) => (dispatch) => {
  
  // console.log(data, myheader);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  return fetch(baseUrl + "update-password", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return response;
    }
    let error = new Error(
      "Error:" + response.status + " " + response.statusText
    );
    error.response = response;
    throw error;
  })
  .then((login) => {
    console.log(login);
    if (login.error) {
      dispatch(updateFailData(login.error));
    } else {
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(updateSetData(login));
      if (toggle) {
        toggle();
      }
    }
    
  })
      .catch((error) => console.log("api error", error));
  };


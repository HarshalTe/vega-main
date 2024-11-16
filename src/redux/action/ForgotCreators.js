import * as ActionTypes from "./ActionTypes";
import Swal from "sweetalert2";
// import axios from "../../shared/axios";
import { baseUrl } from "../../shared/baseUrl";


export const forgotSetData = (forgot) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD_SET_DATA,
    forgot: forgot,
  };
};
export const forgotFailData = (error) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD_FAIL_DATA,
    error: error,
  };
};
//loading
export const forgotLoading = () => {
  return {
    type: ActionTypes.FORGOT_PASSWORD_LOADING,
  };
};
const myheader = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

//Add new code
export const forgotPassword = (data, toggle) => (dispatch)=> {

    // dispatch(loginLoading(true));
    console.log(data, myheader);
    return fetch(baseUrl + "forget-password", {
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
      .then((res) => {
        console.log(res);
    if (res.error) {
      dispatch(forgotFailData(res.error));
    } else {
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Send Update Link",
        showConfirmButton: false,
        timer: 1500,
      });
        dispatch(forgotSetData(res.data));
        if (toggle) {
          toggle();
        }
      }
    })
      .catch((error) => console.log("api error", error));
  };

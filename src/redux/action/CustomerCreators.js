import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const customerSetData = (customer) => {
  return {
    type: actionType.CUSTOMER_SET_DATA,
    customer: customer,
  };
};

export const customerFailData = (error) => {
  return {
    type: actionType.CUSTOMER_FAIL_DATA,
    error: error,
  };
};
export const customerLoading = () => {
  return {
    type: actionType.CUSTOMER_LOADING,
  };
};
export const customerGetData = (data) => {
  return (dispatch) => {
    dispatch(customerLoading());
    axios
      .get(baseUrl + "customers", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(customerSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(customerFailData(error)));
  };
};

export const deleteCustomerFail = (error) => {
  return {
    type: actionType.DELETE_CUSTOMER_FAIL,
    error: error,
  };
};

export const deleteCustomer = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `customers/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Customer!").then(() => {
            dispatch(customerGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCustomerFail(error)));
    }
  };
};

export const postCustomerDataStart = () => {
  return {
    type: actionType.POST_CUSTOMER_DATA_START,
  };
};

export const postCustomerDataFail = (error) => {
  return {
    type: actionType.POST_CUSTOMER_DATA_FAIL,
    error: error,
  };
};

export const postCustomerData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postCustomerDataStart());

    axios
      .post(baseUrl + "customers", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Customer!").then(() => {
          dispatch(customerGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCustomerDataFail(error));
      });
  };
};

export const updateCustomerDataStart = () => {
  return {
    type: actionType.UPDATE_CUSTOMER_DATA_START,
  };
};

export const updateCustomerData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateCustomerDataStart());

    axios
      .post(baseUrl + `customers/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Customer!").then(() => {
          toggle();
          dispatch(customerGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

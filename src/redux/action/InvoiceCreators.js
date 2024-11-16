import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const invoiceSetData = (invoice) => {
  return {
    type: actionType.INVOICE_SET_DATA,
    invoice: invoice,
  };
};

export const invoiceFailData = (error) => {
  return {
    type: actionType.INVOICE_FAIL_DATA,
    error: error,
  };
};
export const invoiceLoading = () => {
  return {
    type: actionType.INVOICE_LOADING,
  };
};
export const invoiceGetData = (data) => {
  return (dispatch) => {
    dispatch(invoiceLoading());
    axios
      .get(baseUrl + "invoices", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(invoiceSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(invoiceFailData(error)));
  };
};

export const invoiceEditSetData = (editcase) => {
  return {
    type: actionType.INVOICE_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const invoiceEditFailData = (error) => {
  return {
    type: actionType.INVOICE_EDIT_FAIL_DATA,
    error: error,
  };
};

export const invoiceEditGetData = (data) => {
  return (dispatch) => {
    dispatch(invoiceLoading());
    axios
      .get(baseUrl + `invoices/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(invoiceEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(invoiceEditFailData(error)));
  };
};

export const deleteInvoiceFail = (error) => {
  return {
    type: actionType.DELETE_INVOICE_FAIL,
    error: error,
  };
};

export const deleteInvoice = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `invoices/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Invoice!").then(() => {
            dispatch(invoiceGetData(data));
          });
        })
        .catch((error) => dispatch(deleteInvoiceFail(error)));
    }
  };
};

export const postInvoiceDataStart = () => {
  return {
    type: actionType.POST_INVOICE_DATA_START,
  };
};

export const postInvoiceDataFail = (error) => {
  return {
    type: actionType.POST_INVOICE_DATA_FAIL,
    error: error,
  };
};

export const postInvoiceData = (
  data,
  user,
  toggle,
  setShowPdf,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(postInvoiceDataStart());

    axios
      .post(baseUrl + "invoices", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Invoice!").then(() => {
          dispatch(invoiceGetData(data));
          if (setShowPdf) {
            setShowPdf(true);
          }
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postInvoiceDataFail(error));
      });
  };
};

export const updateInvoiceDataStart = () => {
  return {
    type: actionType.UPDATE_INVOICE_DATA_START,
  };
};

export const updateInvoiceData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateInvoiceDataStart());

    axios
      .put(baseUrl + `invoices/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Invoice!").then(() => {
          if (toggle) {
            toggle();
          }
          if (setSubmitting) {
            setSubmitting(false);
          }
          dispatch(invoiceGetData(data));
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        console.log(error);
      });
  };
};

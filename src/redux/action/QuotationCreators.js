import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const quotationSetData = (quotation) => {
  return {
    type: actionType.QUOTATION_SET_DATA,
    quotation: quotation,
  };
};

export const quotationFailData = (error) => {
  return {
    type: actionType.QUOTATION_FAIL_DATA,
    error: error,
  };
};
export const quotationLoading = () => {
  return {
    type: actionType.QUOTATION_LOADING,
  };
};
export const quotationGetData = (data) => {
  return (dispatch) => {
    dispatch(quotationLoading());
    axios
      .get(baseUrl + "quotations", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(quotationSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(quotationFailData(error)));
  };
};

export const quotationEditSetData = (editcase) => {
  return {
    type: actionType.QUOTATION_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const quotationEditFailData = (error) => {
  return {
    type: actionType.QUOTATION_EDIT_FAIL_DATA,
    error: error,
  };
};

export const quotationEditGetData = (data) => {
  return (dispatch) => {
    dispatch(quotationLoading());
    axios
      .get(baseUrl + `quotations/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(quotationEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(quotationEditFailData(error)));
  };
};

export const deleteQuotationFail = (error) => {
  return {
    type: actionType.DELETE_QUOTATION_FAIL,
    error: error,
  };
};

export const deleteQuotation = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `quotations/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Quotation!").then(() => {
            dispatch(quotationGetData(data));
          });
        })
        .catch((error) => dispatch(deleteQuotationFail(error)));
    }
  };
};

export const postQuotationDataStart = () => {
  return {
    type: actionType.POST_QUOTATION_DATA_START,
  };
};

export const postQuotationDataFail = (error) => {
  return {
    type: actionType.POST_QUOTATION_DATA_FAIL,
    error: error,
  };
};

export const postQuotationData = (
  data,
  user,
  toggle,
  setShowPdf,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(postQuotationDataStart());

    axios
      .post(baseUrl + "quotations", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Quotation!").then(() => {
          dispatch(quotationGetData(data));

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
        dispatch(postQuotationDataFail(error));
      });
  };
};

export const updateQuotationDataStart = () => {
  return {
    type: actionType.UPDATE_QUOTATION_DATA_START,
  };
};

export const updateQuotationData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateQuotationDataStart());

    axios
      .put(baseUrl + `quotations/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Quotation!").then(() => {
          if (toggle) {
            toggle();
          }
          dispatch(quotationGetData(data));

          if (setSubmitting) {
            setSubmitting(false);
          }
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

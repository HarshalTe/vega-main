import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const companySetData = (company) => {
  return {
    type: actionType.COMPANY_SET_DATA,
    company: company,
  };
};

export const companyFailData = (error) => {
  return {
    type: actionType.COMPANY_FAIL_DATA,
    error: error,
  };
};
export const companyLoading = () => {
  return {
    type: actionType.COMPANY_LOADING,
  };
};
export const companyGetData = (data) => {
  return (dispatch) => {
    dispatch(companyLoading());
    axios
      .get(baseUrl + "companies", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(companySetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(companyFailData(error)));
  };
};

export const deleteCompanyFail = (error) => {
  return {
    type: actionType.DELETE_COMPANY_FAIL,
    error: error,
  };
};

export const deleteCompany = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `companies/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Company!").then(() => {
            dispatch(companyGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCompanyFail(error)));
    }
  };
};

export const postCompanyDataStart = () => {
  return {
    type: actionType.POST_COMPANY_DATA_START,
  };
};

export const postCompanyDataFail = (error) => {
  return {
    type: actionType.POST_COMPANY_DATA_FAIL,
    error: error,
  };
};

export const postCompanyData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(postCompanyDataStart());

    axios
      .post(baseUrl + "companies", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Company!").then(() => {
          dispatch(companyGetData(data));
          toggle();
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCompanyDataFail(error));
        if (setSubmitting) {
          setSubmitting(false);
        }
      });
  };
};

export const updateCompanyDataStart = () => {
  return {
    type: actionType.UPDATE_COMPANY_DATA_START,
  };
};

export const updateCompanyData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCompanyDataStart());

    axios
      .post(baseUrl + `companies/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Company!").then(() => {
          toggle();
          if (setSubmitting) {
            setSubmitting(false);
          }
          dispatch(companyGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
        if (setSubmitting) {
          setSubmitting(false);
        }
      });
  };
};

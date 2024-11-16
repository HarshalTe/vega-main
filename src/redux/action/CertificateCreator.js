import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";
import { usersGetData } from "./UsersCreators";

export const certificateSetData = (certificate) => {
  return {
    type: actionType.CERTIFICATE_SET_DATA,
    certificate: certificate,
  };
};

export const certificateFailData = (error) => {
  return {
    type: actionType.CERTIFICATE_FAIL_DATA,
    error: error,
  };
};
export const certificateLoading = () => {
  return {
    type: actionType.CERTIFICATE_LOADING,
  };
};
export const certificateGetData = (data) => {
  return (dispatch) => {
    dispatch(certificateLoading());
    axios
      .get(baseUrl + "users-files", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(certificateSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(certificateFailData(error)));
  };
};

export const deleteCertificateFail = (error) => {
  return {
    type: actionType.DELETE_CERTIFICATE_FAIL,
    error: error,
  };
};

export const deleteCertificate = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `users-files/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted User Certificate!").then(() => {
            dispatch(usersGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCertificateFail(error)));
    }
  };
};

export const postCertificateDataStart = () => {
  return {
    type: actionType.POST_CERTIFICATE_DATA_START,
  };
};

export const postCertificateDataFail = (error) => {
  return {
    type: actionType.POST_CERTIFICATE_DATA_FAIL,
    error: error,
  };
};

export const postCertificateData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(postCertificateDataStart());

    axios
      .post(baseUrl + "users-files", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created User Certificate!").then(() => {
          dispatch(usersGetData(data));
          toggle();
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCertificateDataFail(error));
        if (setSubmitting) {
          setSubmitting(false);
        }
      });
  };
};

export const updateCertificateDataStart = () => {
  return {
    type: actionType.UPDATE_CERTIFICATE_DATA_START,
  };
};

export const updateCertificateData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCertificateDataStart());

    axios
      .post(baseUrl + `users-files/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated User Certificate!").then(() => {
          toggle();
          if (setSubmitting) {
            setSubmitting(false);
          }
          dispatch(usersGetData(data));
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

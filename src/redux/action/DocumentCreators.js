import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";
import { casesEditGetData, casesGetData } from "./CasesCreator";

export const documentSetData = (document) => {
    return {
      type: actionType.DOCUMENT_SET_DATA,
      document: document,
    };
  };
  
  export const documentFailData = (error) => {
    return {
      type: actionType.DOCUMENT_FAIL_DATA,
      error: error,
    };
  };
  export const documentLoading = () => {
    return {
      type: actionType.DOCUMENT_LOADING,
    };
  };
  export const documentGetData = (data) => {
    return (dispatch) => {
      dispatch(documentLoading());
      axios
        .get(baseUrl + "customer-documents", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        })
        .then((res) => {
          dispatch(documentSetData(res.data));
  
          console.log("response data", res.data);
        })
  
        .catch((error) => dispatch(documentFailData(error)));
    };
  };


  export const postDocumentDataStart = () => {
    return {
      type: actionType.POST_DOCUMENT_DATA_START,
    };
  };
  
  export const postDocumentDataFail = (error) => {
    return {
      type: actionType.POST_DOCUMENT_DATA_FAIL,
      error: error,
    };
  };
  
  export const postDocumentData = (data, user, toggle) => {
    return (dispatch) => {
      dispatch(postDocumentDataStart());
  
      axios
        .post(baseUrl + "customer-documents", user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Created Mapping Document!").then(() => {
            dispatch(documentGetData(data));
            toggle();
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch(postDocumentDataFail(error));
        });
    };
  };
  

  export const deleteDocumentFail = (error) => {
    return {
      type: actionType.DELETE_DOCUMENT_FAIL,
      error: error,
    };
  };
  
  export const deleteDocument = (data, user_id) => {
    return (dispatch) => {
      if (user_id) {
        axios
          .delete(baseUrl + `customer-documents/${user_id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + data?.token,
            },
          })
          .then(() => {
            console.log("swal");
            swal("Successfully Deleted Mapping Document!").then(() => {
              dispatch(documentGetData(data));
            });
          })
          .catch((error) => dispatch(deleteDocumentFail(error)));
      }
    };
  };

  export const updateDocumentDataStart = () => {
    return {
      type: actionType.UPDATE_DOCUMENT_DATA_START,
    };
  };
  
  export const updateDocument = (data, user, toggle) => {
    return (dispatch) => {
      dispatch(updateDocumentDataStart());
  
      axios
        .post(baseUrl + `customer-documents/${data.id}?_method=PUT`, user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Updated Mapping Document!").then(() => {
            toggle();
            dispatch(documentGetData(data));
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";


export const pageDetailsSetData = (pageDetails) => {
    console.log("object1122",pageDetails)
    return {
      type: actionType.PAGE_DETAILS_SET_DATA,
      pageDetails: pageDetails,
    };
  };
  
  export const pageDetailsFailData = (error) => {
    return {
      type: actionType.PAGE_DETAILS_FAIL_DATA,
      error: error,
    };
  };
  export const pageDetailsLoading = () => {
    return {
      type: actionType.PAGE_DETAILS_LOADING,
    };
  };

export const getCasesDataPageDetail = (data) => {
    return (dispatch) => {
      dispatch(pageDetailsLoading());
      axios
      .get(baseUrl + "page-details", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        })
        .then((res) => {
          dispatch(pageDetailsSetData(res.data));
  
          console.log("", res.data);
        })
        
        .catch((error) => dispatch(pageDetailsFailData(error)));
    };
  };

  export const postCasesDataStartAc = () => {
    return {
      type: actionType.POST_CASES_DATA_START_AC,
    };
  };
  
  export const postCasesDataFailAc = (error) => {
    return {
      type: actionType.POST_CASES_DATA_FAIL_AC,
      error: error,
    };
  };
  export const postCasesDataPageDetail = (data, user) => {
    return (dispatch) => {
    //   dispatch(postCasesDataStartAc());
      console.log(data,user,"data500");
      console.log(baseUrl + "ac-details","data500",data);
  
      axios
        .post(baseUrl + "page-details", user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          
          swal("Successfully Created Cases!").then(() => {
            dispatch(getCasesDataPageDetail(data));
            // toggle();
          });
        })
        .catch((error) => {
          console.log(error);
        //   dispatch(postCasesDataFailAc(error));
        });
    };
  };


  export const updatePageDetail = (data, user) => {
    return (dispatch) => {
    //   dispatch(updateInvoiceDataStart());
  
      axios
        .put(baseUrl + `page-details/${user.id}`, user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Updated The Report!").then(() => {
            dispatch(getCasesDataPageDetail(data));
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";
import Swal from "sweetalert2";
import { testsEditGetData, testsGetData } from "./TestsCreators";

export const rawDataSetData = (rawData) => {
  return {
    type: actionType.RAW_DATA_SET_DATA,
    rawData: rawData,
  };
};

export const rawDataFailData = (error) => {
  return {
    type: actionType.RAW_DATA_FAIL_DATA,
    error: error,
  };
};
export const rawDataLoading = () => {
  return {
    type: actionType.RAW_DATA_LOADING,
  };
};
export const rawDataGetData = (data) => {
  return (dispatch) => {dispatch(rawDataLoading());
    axios
      .get(baseUrl + `fetch-raw-data/${data?.caseId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(rawDataSetData(res.data));

        console.log("graph data",res, res.data);
      })

      .catch((error) => dispatch(rawDataFailData(error)));
  };
};


   export const filtetData =(data,user)=>{
    return (dispatch) => {dispatch(rawDataLoading());
      console.log("objectRow",data,user)
      fetch(baseUrl+`fetch-raw-data/${data.caseId}`,{
      method:"PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body:JSON.stringify(user)
    }).then((result)=>{
      result.json().then((resp)=>{
        console.log("objectRow",resp)
        dispatch(rawDataSetData(resp))
        // const rows2=[]
        // rows2.push(resp.length > 0?resp:resp?.trace)
        console.log("objectRow",resp,"lll",resp.file)
      })
    })
  }
}

export const deleteRawDataFail = (error) => {
  return {
    type: actionType.DELETE_RAW_DATA_FAIL,
    error: error,
  };
};

export const deleteRawData = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `tests/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted  RawData!").then(() => {
            dispatch(rawDataGetData(data));
            dispatch(testsEditGetData(data));
            dispatch(testsGetData(data));
          });
        })
        .catch((error) => dispatch(deleteRawDataFail(error)));
    }
  };
};

export const postRawDataDataStart = () => {
  return {
    type: actionType.POST_RAW_DATA_DATA_START,
  };
};

export const postRawDataDataFail = (error) => {
  return {
    type: actionType.POST_RAW_DATA_DATA_FAIL,
    error: error,
  };
};

export const postRawDataData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postRawDataDataStart());

    axios
      .post(baseUrl + "tests", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created  RawData!").then(() => {
          dispatch(rawDataGetData(data));
          dispatch(testsEditGetData(data));
          dispatch(testsGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postRawDataDataFail(error));
      });
  };
};

export const updateRawDataDataStart = () => {
  return {
    type: actionType.UPDATE_RAW_DATA_DATA_START,
  };
};

export const updateRawDataData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateRawDataDataStart());

    axios
      .post(baseUrl + `tests/${data.raw_id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        dispatch(rawDataGetData(data));
        dispatch(testsEditGetData(data));
        dispatch(testsGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Raw Data",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (toggle) {
            toggle();
          }
          if (setSubmitting) {
            setSubmitting(false);
          }
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

export const rawDataUpdateAllStart = () => {
  return {
    type: actionType.RAW_DATA_UPDATE_ALL_START,
  };
};

export const rawDataUpdateAllFail = (error) => {
  return {
    type: actionType.RAW_DATA_UPDATE_ALL_FAIL,
    error: error,
  };
};

export const rawDataUpdateAllLoading = () => {
  return {
    type: actionType.RAW_DATA_UPDATE_ALL_LOADING,
  };
};

export const rawDataUpdateAllSuccess = () => {
  return {
    type: actionType.RAW_DATA_UPDATE_ALL_SUCCESS,
  };
};

export const rawDataUpdateAll = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(rawDataUpdateAllStart());
    dispatch(rawDataUpdateAllLoading());

    axios
      .post(
        baseUrl + `test-replicate-all/${user?.test_type_id}?_method=PUT`,
        user,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then(() => {
        
        console.log("swal");
        swal("Successfully Updated All RawData!").then(() => {
          data.testId = user.test_type_id;
          if (toggle) {
            toggle();
          }

          if (setSubmitting) {
            setSubmitting(false);
          }
          dispatch(rawDataGetData(data));
          dispatch(testsEditGetData(data));
          dispatch(testsGetData(data));
          dispatch(rawDataUpdateAllSuccess());
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(rawDataUpdateAllFail(error));

        if (setSubmitting) {
          setSubmitting(false);
        }
      });
  };
};

export const rawDataDeleteAllStart = () => {
  return {
    type: actionType.RAW_DATA_DELETE_ALL_START,
  };
};

export const rawDataDeleteAllFail = (error) => {
  return {
    type: actionType.RAW_DATA_DELETE_ALL_FAIL,
    error: error,
  };
};

export const rawDataDeleteAllLoading = () => {
  return {
    type: actionType.RAW_DATA_DELETE_ALL_LOADING,
  };
};

export const rawDataDeleteAllSuccess = () => {
  return {
    type: actionType.RAW_DATA_DELETE_ALL_SUCCESS,
  };
};

export const rawDataDeleteAll = (data, user) => {
  return (dispatch) => {
    dispatch(rawDataDeleteAllStart());
    dispatch(rawDataDeleteAllLoading());

    axios
      .post(baseUrl + "test-delete-all", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Deleted All RawData!").then(() => {
          dispatch(rawDataGetData(data));
          dispatch(testsEditGetData(data));
          dispatch(testsGetData(data));
          dispatch(rawDataDeleteAllSuccess());
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(rawDataDeleteAllFail(error));
      });
  };
};

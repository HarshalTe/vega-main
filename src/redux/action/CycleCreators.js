import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";
import { casesEditGetData, casesGetData } from "./CasesCreator";

export const cycleSetData = (cycle) => {
  return {
    type: actionType.CYCLE_SET_DATA,
    cycle: cycle,
  };
};

export const cycleFailData = (error) => {
  return {
    type: actionType.CYCLE_FAIL_DATA,
    error: error,
  };
};
export const cycleLoading = () => {
  return {
    type: actionType.CYCLE_LOADING,
  };
};
export const cycleGetData = (data) => {
  return (dispatch) => {
    dispatch(cycleLoading());
    axios
      .get(baseUrl + "dooropentype", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(cycleSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(cycleFailData(error)));
  };
};

export const cycleEditSetData = (editcase) => {
  return {
    type: actionType.CYCLE_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const cycleEditFailData = (error) => {
  return {
    type: actionType.CYCLE_EDIT_FAIL_DATA,
    error: error,
  };
};

export const cycleEditGetData = (data) => {
  return (dispatch) => {
    dispatch(cycleLoading());
    axios
      .get(baseUrl + `dooropentype/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(cycleEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(cycleEditFailData(error)));
  };
};

export const deleteCycleFail = (error) => {
  return {
    type: actionType.DELETE_CYCLE_FAIL,
    error: error,
  };
};

export const deleteCycle = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `dooropentype/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Mapping Cycle!").then(() => {
            dispatch(cycleGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCycleFail(error)));
    }
  };
};

export const postCycleDataStart = () => {
  return {
    type: actionType.POST_CYCLE_DATA_START,
  };
};

export const postCycleDataFail = (error) => {
  return {
    type: actionType.POST_CYCLE_DATA_FAIL,
    error: error,
  };
};

export const postCycleData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postCycleDataStart());

    axios
      .post(baseUrl + "dooropentype", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Mapping Cycle!").then(() => {
          dispatch(cycleGetData(data));
          dispatch(casesGetData(data));
          dispatch(casesEditGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCycleDataFail(error));
      });
  };
};

export const updateCycleDataStart = () => {
  return {
    type: actionType.UPDATE_CYCLE_DATA_START,
  };
};

export const updateCycleData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateCycleDataStart());

    axios
      .post(baseUrl + `dooropentype/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Mapping Cycle!").then(() => {
          toggle();
          dispatch(cycleGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

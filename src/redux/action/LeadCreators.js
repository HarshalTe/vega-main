import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const leadSetData = (lead) => {
  return {
    type: actionType.LEAD_SET_DATA,
    lead: lead,
  };
};

export const leadFailData = (error) => {
  return {
    type: actionType.LEAD_FAIL_DATA,
    error: error,
  };
};

export const leadGetData = () => {
  return (dispatch) => {
    axios
      .get("https://dummy.restapiexample.com/api/v1/employees")
      .then((res) => {
        dispatch(leadSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(leadFailData(error)));
  };
};

export const deleteLeadFail = (error) => {
  return {
    type: actionType.DELETE_LEAD_FAIL,
    error: error,
  };
};

export const deleteLead = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `transacs/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Lead!").then(() => {
            dispatch(leadGetData(data));
          });
        })
        .catch((error) => dispatch(deleteLeadFail(error)));
    }
  };
};

export const postLeadDataStart = () => {
  return {
    type: actionType.POST_LEAD_DATA_START,
  };
};

export const postLeadDataFail = (error) => {
  return {
    type: actionType.POST_LEAD_DATA_FAIL,
    error: error,
  };
};

export const postLeadData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postLeadDataStart());

    axios
      .post(baseUrl + "transacs", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Lead!").then(() => {
          dispatch(leadGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postLeadDataFail(error));
      });
  };
};

export const editLeadRowStart = () => {
  return {
    type: actionType.EDIT_LEAD_ROW_START,
  };
};

export const failEditLead = (error) => {
  return {
    type: actionType.FAIL_EDIT_LEAD,
    error: error,
  };
};

export const editLeadRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editLeadRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `transacs/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          assesement_id: res.data.assesement_id,
          asses_name: res.data.assesement.name,
          name: res.data.name,
        });
      })
      .catch((error) => dispatch(failEditLead(error)));
  };
};

export const updateLeadDataStart = () => {
  return {
    type: actionType.UPDATE_LEAD_DATA_START,
  };
};

export const updateLeadData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateLeadDataStart());

    axios
      .post(baseUrl + `transacs/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Lead!").then(() => {
          toggle();
          dispatch(leadGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

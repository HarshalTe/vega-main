import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";
import ReeferGraph2 from "../../components/main Components/CaseMaster/ReeferVehicle/ReeferGraph/ReeferGraph2";
import ReeferGraph from "../../components/main Components/CaseMaster/ReeferVehicle/ReeferGraph/ReeferGraph";

export const casesSetData = (cases) => {
  return {
    type: actionType.CASES_SET_DATA,
    cases: cases,
  };
};
export const getSheetData = (sheet) => {
  return {
    type: actionType.SHEET_DATA,
    sheet: sheet,
  };
};
export const getSensorsData = (sensor) => {
  return {
    type: actionType.SENSORS_DATA,
    sensor: sensor,
  };
};

export const casesFailData = (error) => {
  return {
    type: actionType.CASES_FAIL_DATA,
    error: error,
  };
};
export const casesLoading = () => {
  return {
    type: actionType.CASES_LOADING,
  };
};
export const casesGetData = (data) => {
  return (dispatch) => {
    dispatch(casesLoading());
    axios
    .get(baseUrl + "cases", {
      headers: {
        Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(casesSetData(res.data));
        
        console.log("response data", res.data);
      })
      
      .catch((error) => dispatch(casesFailData(error)));
    };
  };
  
  
  export const sheetFailData = (error) => {
    return {
      // type: actionType.CASES_FAIL_DATA,
      // error: error,
    };
  };
  export const sheetGetData = (data) => {
    return (dispatch) => {
      // dispatch(casesLoading());
      console.log("graph data",baseUrl + `data-loggers/${data.id}`);
      axios
      .get(baseUrl + `data-loggers/${data.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(getSheetData(res));

        console.log("graph data",res, res.data);
      })
      
      .catch((error) => console.log("graph data",error));

    };
};
  export const sensorsGetData = (data) => {
    return (dispatch) => {
      // dispatch(casesLoading());
      // console.log("graph data",baseUrl + `data-loggers/${data.id}`);
      axios
      .get(baseUrl + `sensors`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(getSensorsData(res));

        console.log("graph data",res, res.data);
      })
      
      .catch((error) => console.log("graph data",error));

    };
};

export const casesEditSetData = (editcase) => {
  return {
    type: actionType.CASES_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const casesEditFailData = (error) => {
  return {
    type: actionType.CASES_EDIT_FAIL_DATA,
    error: error,
  };
};

export const casesEditGetData = (data) => {
  return (dispatch) => {
    dispatch(casesLoading());
    axios
      .get(baseUrl + `cases/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(casesEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(casesEditFailData(error)));
  };
};

export const deleteCasesFail = (error) => {
  return {
    type: actionType.DELETE_CASES_FAIL,
    error: error,
  };
};

export const deleteCases = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `cases/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Cases!").then(() => {
            dispatch(casesGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCasesFail(error)));
    }
  };
};

export const postCasesDataStart = () => {
  return {
    type: actionType.POST_CASES_DATA_START,
  };
};

export const postCasesDataFail = (error) => {
  return {
    type: actionType.POST_CASES_DATA_FAIL,
    error: error,
  };
};

export const postCasesData = (data, user, toggle) => {
  console.log("data500",data,user,toggle)
  return (dispatch) => {
    dispatch(postCasesDataStart());

    axios
      .post(baseUrl + "cases", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Cases!").then(() => {
          console.log("data500")
          dispatch(casesGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCasesDataFail(error));
      });
  };
};



export const acSetData = (ac) => {
  return {
    type: actionType.AC_SET_DATA,
    ac: ac,
  };
};

export const acFailData = (error) => {
  return {
    type: actionType.AC_FAIL_DATA,
    error: error,
  };
};
export const acLoading = () => {
  return {
    type: actionType.AC_LOADING,
  };
};
export const getCasesDataAc = (data) => {
  return (dispatch) => {
    dispatch(acLoading());
    axios
    .get(baseUrl + "ac-details", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(acSetData(res.data));

        console.log("response data", res.data);
      })
      
      .catch((error) => dispatch(acFailData(error)));
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

export const postCasesDataAc = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postCasesDataStartAc());
    console.log(data,user,toggle,"data500");
    console.log(baseUrl + "ac-details","data500",data);

    axios
      .post(baseUrl + "ac-details", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        
        swal("Successfully Created Cases!").then(() => {
          dispatch(getCasesDataAc(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCasesDataFailAc(error));
      });
  };
};

export const deleteCasesAc = (data, userId) => {
  return (dispatch) => {
    if (userId) {
      axios
        .delete(baseUrl + `ac-details/${userId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Cases!").then(() => {
            dispatch(getCasesDataAc(data));
          });
        })
        .catch((error) => dispatch(deleteCasesFail(error)));
    }
  };
};


// export const updateUser = (data, user,userId, toggle) => {
//   return (dispatch) => {
//     dispatch(postCasesDataStartAc());
//     console.log(data,user,toggle,"data500",baseUrl + `ac-details/${userId}`, user);

//     axios
//       .put(baseUrl + `ac-details/${userId}`, user, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + data?.token,
//         },
//       })
//       .then(() => {
//         console.log("swal");
//         dispatch(getCasesDataAc(data));
        
//         swal("Successfully Created Cases!").then(() => {
//           toggle();
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(postCasesDataFailAc(error));
//       });
//   };
// };




// export const updateUser=(data, dataPut, userId, toggle)=>(dispatch)=>{
//   console.log("object",data, dataPut, userId,baseUrl+"ac-details"+"/"+userId)
//   fetch(baseUrl+"ac-details"+"/"+userId, {
//   method: 'PUT',
//   headers: {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json',
//   Authorization: "Bearer " + data?.token,
// },
// body: JSON.stringify(dataPut)
//   }).then((result) => {
//     result.json()
//     .then((resp) => {
//       console.warn(resp,"done")
//       dispatch(getCasesDataAc(data));
      
//       swal("Successfully Update Cases!").then(() => {
//       });
//   })
//   })
// }

export const detailCasesData = (data, toggle) => {
  return (dispatch) => {
    axios
    .post(baseUrl + "+", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Assign Cases!").then(() => {
          dispatch(casesGetData(data));

          if (toggle) {
            toggle();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    };
  };

export const updateCasesDataStart = () => {
  return {
    type: actionType.UPDATE_CASES_DATA_START,
  };
};

export const updateCasesData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCasesDataStart());

    axios
      .post(baseUrl + `cases/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        dispatch(casesGetData(data));
        dispatch(casesEditGetData(data));
        swal("Successfully Updated Cases!").then(() => {
          toggle();

          if (setSubmitting) {
            setSubmitting(false);
          }
          // if (setGraph) {
          //   setGraph(true);
          //   // return (
          //   //   <>
          //   //     <ReeferGraph2 />
          //   //     <ReeferGraph />
          //   //   </>
          //   // );
          // }
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

//  get company address
export const getCompanyAddress = (id) => {
  return {
    type: actionType.CASES_EDIT_COMPANY_ADDRESS,
    id: id,
  };
};

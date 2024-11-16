import * as actionType from "../action/ActionTypes";

const initialState = {
  parameter1: [],
  parameter2: [],
  parameter3: [],
  parameterHumidity: [],
  error1: false,
  error2: false,
  error3: false,
  errorHumidity: false,
  isLoading1: false,
  isLoading2: false,
  isLoading3: false,
  isLoadingHumidity: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PARAMETER_SET_DATA1:
      return {
        ...state,
        parameter1: action.parameter,
        isLoading1: false,
        error1: false,
      };

    case actionType.PARAMETER_SET_DATA2:
      return {
        ...state,
        parameter2: action.parameter,
        isLoading2: false,
        error2: false,
      };

    case actionType.PARAMETER_SET_DATA3:
      return {
        ...state,
        parameter3: action.parameter,
        isLoading3: false,
        error3: false,
      };
    case actionType.PARAMETER_SET_DATA_HUMIDITY:
      return {
        ...state,
        parameterHumidity: action.parameter,
        isLoadingHumidity: false,
        errorHumidity: false,
      };

    case actionType.PARAMETER_FAIL_DATA1:
      return {
        ...state,
        isLoading1: false,
        error1: action.error,
        parameter1: [],
      };
    case actionType.PARAMETER_FAIL_DATA2:
      return {
        ...state,
        isLoading2: false,
        error2: action.error,
        parameter2: [],
      };
    case actionType.PARAMETER_FAIL_DATA3:
      return {
        ...state,
        isLoading3: false,
        error3: action.error,
        parameter3: [],
      };
    case actionType.PARAMETER_FAIL_DATA_HUMIDITY:
      return {
        ...state,
        isLoadingHumidity: false,
        errorHumidity: action.error,
        parameterHumidity: [],
      };
    case actionType.PARAMETER_LOADING1:
      return {
        ...state,
        isLoading1: true,
        error1: false,
        parameter1: [],
      };
    case actionType.PARAMETER_LOADING2:
      return {
        ...state,
        isLoading2: true,
        error2: false,
        parameter2: [],
      };
    case actionType.PARAMETER_LOADING3:
      return {
        ...state,
        isLoading3: true,
        error3: false,
        parameter3: [],
      };
    case actionType.PARAMETER_LOADING_HUMIDITY:
      return {
        ...state,
        isLoadingHumidity: true,
        errorHumidity: false,
        parameterHumidity: [],
      };

    default:
      return state;
  }
};

export default reducer;

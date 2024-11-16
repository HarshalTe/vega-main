import * as actionType from "../action/ActionTypes";

const initialState = {
  lead: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LEAD_SET_DATA:
      return {
        ...state,
        lead: action.lead,
        error: false,
      };

    case actionType.LEAD_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_LEAD_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_LEAD_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_LEAD_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_LEAD:
      return {
        ...state,
        editing: true,
        currentUser: [
          {
            id: action.id,
            name: action.name,
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;

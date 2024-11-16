// const initialState = false
// const ON_TOGGLE3 = (state = initialState, action)=>{
//     switch (action.type){
//         case "ON_TOGGLE3" : return state = (state==false?true:false)
//         default: return state
//     }
// }

// export default ON_TOGGLE3

import * as actionType from "../action/ActionTypes";

// const initialState =checked

const reducer = (state=false , action) => {
  switch (action.type) {
    case actionType.ON_TOGGLE33: return state=(action.checked)

    default: return state;
  }
};

export default reducer;
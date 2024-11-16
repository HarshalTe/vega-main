// import * as ActionTypes from "../action/ActionTypes";

// const initialState = false
// const onToggle = (state = initialState, action)=>{
//     switch (action.type){
//         case "ON_TOGGLE" : return state = (state==false?true:false)
//         default: return state
//     }
// }

// export default onToggle

// const initialState = false
// const onToggle = (state = initialState, action)=>{
//     switch (action.type){
//         case "ON_TOGGLE1" : return state = (state==false?true:false)
//         default: return state
//     }
// }

// export default onToggle


import * as actionType from "../action/ActionTypes";

// const initialState =checked

const reducer = (state=false , action) => {
  console.log("object12",action.checked)
  switch (action.type) {
    case actionType.ON_TOGGLE12: return state=(action.checked)

    default: return state;
  }
};

export default reducer;
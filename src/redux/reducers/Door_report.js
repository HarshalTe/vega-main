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

const reducer = (state=true , action) => {
  // console.log("object123",action.checked,state)
  switch (action.type) {
    case actionType.ON_TOGGLE1: return state=(action.checked)
    
    default: return state;
  }
};

export default reducer;
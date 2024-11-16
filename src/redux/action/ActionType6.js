import * as actionType from "./ActionTypes";
const ON_TOGGLE6 = (checked)=>{
    console.log("object",checked)
    return{
        // type:"ON_TOGGLE2"
        type: actionType.ON_TOGGLE6,
        checked: checked,
    }
}
export default ON_TOGGLE6
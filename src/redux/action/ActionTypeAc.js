// contineous operation
import * as actionType from "./ActionTypes";
const ON_TOGGLE_AC = (checked)=>{
    console.log("object",checked)
    return{
        // type:"ON_TOGGLE2"
        type: actionType.ON_TOGGLE_AC,
        checked: checked,
    }
}
export default ON_TOGGLE_AC
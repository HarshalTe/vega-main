import React from "react";
import logo from "../../../../../assets/images/logo.png";
import vega from "../../../../../assets/vaga-images/vegacrop.png";
import { DataTime } from "../../../../DateFormat/DataTime";


function RHeader(props) {
  return (
    <div className="d-flex" style={{"justify-content": "space-between"}}>
      <div className="d-flex">
      <img src={logo} alt="" height="50px" style={{ maxWidth: "100%" }} />
      <img src={vega} alt="" style={{ maxWidth: "90%" }} />
      </div>
      <div className="" style={{"margin-left": "11vw","font-weight": "700","width":"25vw","line-height": "initial","font-size": "11px","text-align": "start"}}>
                                Digitally Signed By : {props?.user?.checked_by}<br/>
                                Reason : Authorised Signatory <br/>
                                Date/Time :{ props?.user?.checked_by_time? <DataTime data={props.user.checked_by_time} />: "N/A"}
                                </div>
    </div>
  );
}

export default RHeader;

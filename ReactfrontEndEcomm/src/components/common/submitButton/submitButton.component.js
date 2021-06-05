import React from "react";

const Button = (props) => {

  const disabledLabel = props.disableLabel || "submitting...";
  const enableLabel = props.enableLabel || "submit";

  const btn = props.isSubmitting 
  ? ( <button disabled className="btn btn-info"> {disabledLabel}</button>)
                                
  : ( <button disabled={props.isDisabled} className="btn btn-primary" type='submit'>{enableLabel} </button>);

  return btn;

};

export default Button;

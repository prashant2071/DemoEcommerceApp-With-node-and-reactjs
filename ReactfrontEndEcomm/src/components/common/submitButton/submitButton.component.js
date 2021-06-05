import React from "react";

const Button = (props) => {

  const disableLabel = props.disableLabel || "submitting...";
  const enableLabel = props.enableLabel || "submit";

  const btn = props.isSubmitting 
  ? ( <button disabled className="btn btn-info"> {disableLabel}</button>)
                                
  : ( <button disabled={props.isDisabled} className="btn btn-primary" type='submit'>{enableLabel} </button>);

  return btn;

};

export default Button;

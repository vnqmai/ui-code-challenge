import React from "react";
import "./InputRange.scss";
import { Form } from "react-bootstrap";

const InputRange = (props) => {
  return (
    <div className="input-range">
      <Form.Range
        {...props}
      />
    </div>
  );
};

export default InputRange;
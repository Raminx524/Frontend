import React, { useEffect, useState } from "react";

function Input(props) {
  const [val, setVal] = useState("");
  const { id, name, type, placeholder, value, customStyle } = props;
  const style = `border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300 ${customStyle}`;
  useEffect(() => {
    setVal(value);
  }, []);
  return (
    <input
      id={id ? id : ""}
      name={name ? name : ""}
      type={type ? type : "text"}
      placeholder={placeholder ? placeholder : ""}
      value={val}
      onChange={(e) => {
        setVal(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
      className={style}
    />
  );
}

export default Input;

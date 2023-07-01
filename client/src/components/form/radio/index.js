"use client";
import React from "react";
const RadioButton = ({ data, handleChange }) => {
  const { id, value, name, checkValue } = data;

  return (
    <>
      <input
        className="mx-4"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={value === checkValue}
        onChange={handleChange}
      ></input>
      {checkValue}
    </>
  );
};
export default RadioButton;

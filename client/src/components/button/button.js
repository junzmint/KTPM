"use client";
import React from "react";

function UpdateButton(props) {
  const style = `text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700`;
  return (
    <button type="button" onClick={props.onClick} className={style}>
      {props.text}
    </button>
  );
}

export default UpdateButton;

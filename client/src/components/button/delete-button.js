"use client";
import React from "react";

function DeleteButton(props) {
  const style = `text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700`;
  return (
    <button type="button" onClick={props.onClick} className={style}>
      {props.text}
    </button>
  );
}

export default DeleteButton;

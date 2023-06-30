"use client";
import Link from "next/link";
import React from "react";
const Item = ({ data }) => {
  const { name, path } = data || {};
  const ITEM_HEIGHT = "40px";
  return (
    <Link href={`${path}`}>
      <div
        type="button"
        style={{
          height: "40px",
          minHeight: ITEM_HEIGHT,
          maxHeight: ITEM_HEIGHT,
        }}
        className="text-light w-full rounded-[3px] hover:bg-primary-dark flex items-center px-[10px] cursor-pointer"
      >
        <div className="font-medium whitespace-nowrap select-none">{name}</div>
      </div>
    </Link>
  );
};

export default Item;

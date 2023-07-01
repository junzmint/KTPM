"use client";

const InputField = ({ data, handleChange }) => {
  const { type, id, value, name, placeHolder, label } = data;
  return (
    <div>
      <label for={id} className="px-4">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeHolder}
        className=" border-b-1 h-[36px] bg-white-200 text-black rounded px-4"
        style={{ overflow: "visible" }}
      ></input>
    </div>
  );
};

export default InputField;

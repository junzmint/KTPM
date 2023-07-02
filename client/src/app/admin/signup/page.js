"use client";
import LogoutButton from "@/components/auth/Logout";
import { InputField, RadioButton } from "@/components/form";
import React, { useState } from "react";
const SignUp = () => {
  const defaultValue = {
    phone: "",
    password: "",
    role: "",
  };
  const [user, setUser] = useState(defaultValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name) {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setUser((prevUser) => ({ ...prevUser, role: value }));
    }
  };

  const phoneNum = {
    type: "text",
    id: "phone",
    value: `${user.phone}`,
    name: "phone",
    placeHolder: "Enter phone num",
    label: "Số điện thoại",
  };
  const password = {
    type: "password",
    id: "password",
    value: `${user.password}`,
    name: "password",
    placeHolder: "Enter password",
    label: "Mật khẩu",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    const response = await fetch("http://localhost:4000/user/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      setIsSuccess(true);
      setSuccessMessage(data.message);
      setUser(defaultValue);
    } else {
      const data = await response.json();
      setIsSuccess(true);
      setSuccessMessage(data.error.message);
      setUser(defaultValue);
    }
  };

  return (
    <>
      <div className="flex flex-col align-center">
        <form onSubmit={handleSubmit}>
          <div>
            <InputField data={phoneNum} handleChange={handleChange} />
          </div>
          <div>
            <InputField data={password} handleChange={handleChange} />
          </div>
          <div>
            <div className="px-4">Role</div>

            <input
              className="mx-4"
              type="radio"
              id="ADMIN"
              name="role"
              value="ADMIN"
              onChange={handleChange}
            ></input>
            <label for="role">ADMIN</label>
            <input
              className="mx-4"
              type="radio"
              id="LEADER"
              name="role"
              value="LEADER"
              onChange={handleChange}
            ></input>
            <label for="role">LEADER</label>
            <input
              className="mx-4"
              type="radio"
              id="ACCOUNTANT"
              name="role"
              value="ACCOUNTANT"
              onChange={handleChange}
            ></input>
            <label for="role">ACCOUNTANT</label>
          </div>
          <button type="submit" className="p-5 bg-red-200 hover:bg-red-400">
            Register
          </button>
        </form>
      </div>
      {isSuccess && <div>{successMessage}</div>}
    </>
  );
};
export default SignUp;

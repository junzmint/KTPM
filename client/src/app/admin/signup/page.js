"use client";
import { SubmitButton } from "@/components/button";
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
    <div className="flex flex-row w-4/5 px-10 mx-auto bg-white justify-center">
      <div className="bg-white mt-24 px-6 py-8 rounded shadow-md text-black w-full">
        <div className="mx-auto w-4/5">
          <h1 className="mb-8 text-3xl text-center ">Tạo người dùng mới</h1>
          <div className="flex flex-row ">
            <form onSubmit={handleSubmit} className="mx-auto">
              <div>
                <InputField data={phoneNum} handleChange={handleChange} />
              </div>
              <div>
                <InputField data={password} handleChange={handleChange} />
              </div>
              <div>
                <div className=" text-gray-700 text-sm font-bold mb-2">
                  Role
                </div>

                <input
                  className="mx-4"
                  type="radio"
                  id="ADMIN"
                  name="role"
                  value="ADMIN"
                  checked={user.role === "ADMIN"}
                  onChange={handleChange}
                ></input>
                <label for="role">ADMIN</label>
                <input
                  className="mx-4"
                  type="radio"
                  id="LEADER"
                  name="role"
                  value="LEADER"
                  checked={user.role === "LEADER"}
                  onChange={handleChange}
                ></input>
                <label for="role">LEADER</label>
                <input
                  className="mx-4"
                  type="radio"
                  id="ACCOUNTANT"
                  name="role"
                  value="ACCOUNTANT"
                  checked={user.role === "ACCOUNTANT"}
                  onChange={handleChange}
                ></input>
                <label for="role">ACCOUNTANT</label>
              </div>
              <div className="text-center pt-5">
                <SubmitButton text="Đăng kí" />
              </div>
            </form>
          </div>
          {isSuccess && (
            <div
              id="defaultModal"
              tabindex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="defaultModal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-6 space-y-6">{successMessage}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SignUp;

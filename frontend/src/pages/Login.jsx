import React, { useState } from "react";

const Login = () => {
  const [currenstState, setCurrentState] = useState("Login");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      class="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div class="inline-flex items-center gap-2 mb-2 mt-10">
        <p class="prata-regular text-3xl">{currenstState}</p>
        <hr class="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currenstState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required=""
          value=""
        />
      )}
      <input
        type="email"
        class="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value=""
      />
      <input
        type="password"
        class="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value=""
      />
      <div class="w-full flex justify-between text-sm mt-[-8px]">
        <p class=" cursor-pointer">Forgot your password?</p>
        {currenstState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")} class=" cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")} class=" cursor-pointer">
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        class="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currenstState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

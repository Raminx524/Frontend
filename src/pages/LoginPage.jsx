import React from "react";

function LoginPage() {
  function handleLogin(e) {
    e.preventDefault();
    const formElem = e.target;
    const username = formElem.username.value;
    const password = formElem.password.value;
    console.log({ username, password });
  }
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex sm:flex-row flex-col items-center sm:gap-3"
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border-2 border-black rounded-md w-56"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 border-black rounded-md w-56"
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

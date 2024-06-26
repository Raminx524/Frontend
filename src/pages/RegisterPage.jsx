import React from "react";

function RegisterPage() {
  function handleRegister(e) {
    e.preventDefault();
    const formElem = e.target;
    const newUser = {
      username: formElem.username.value,
      password: formElem.password.value,
      firstName: formElem.firstName.value,
      lastName: formElem.lastName.value,
    };
    console.log(newUser);
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;

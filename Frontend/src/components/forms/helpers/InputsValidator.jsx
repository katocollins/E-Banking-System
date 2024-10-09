import React from "react";

// validate name
const validateName = (name) => {
  let regex = new RegExp(
    "^(?=[a-zA-Z0-9._ ]{10,35}$)(?!.*[_.]{2})[^_.].*[^_.]$"
  );
  return regex.test(name);
};

// validate password
const validatePassword = (password) => {
  let regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})" // Use 8 characters to match backend
  );
  return regex.test(password);
};

const NameRequirements = ({ isValid }) => (
  <div
    className={`${
      isValid ? "text-green-600" : "text-red-600"
    } text-xs md:text-sm font-semibold px-2 my-4`}
  >
    <p>Name Must:</p>
    <p>* Be 10 characters or more long.</p>
    <p>* Contain allowed characters only [a-zA-Z0-9._].</p>
    <p>* Not contain _ or . at the beginning.</p>
    <p>* Not contain __, _. , ._ or .. inside.</p>
    <p>* Not contain _ or . at the end.</p>
  </div>
);

const PasswordRequirements = ({ isValid }) => (
  <div
    className={`${
      isValid ? "text-green-600" : "text-red-600"
    } text-xs md:text-sm font-semibold px-2 my-4`}
  >
    <p>Password Must:</p>
    <p>* Be 8 characters or longer.</p> {/* Matches backend */}
    <p>* Contain at least 1 lowercase alphabetical character.[a-z]</p>
    <p>* Contain at least 1 uppercase alphabetical character.[A-Z]</p>
    <p>* Contain at least 1 numeric character.[0-9]</p>
    <p>* Contain at least one special character.[!@#$%^&*]</p>
  </div>
);

export const InputsValidator = ({ nameInput = null, passwordInput = null }) => {
  if (nameInput) return <NameRequirements isValid={validateName(nameInput)} />;
  if (passwordInput)
    return <PasswordRequirements isValid={validatePassword(passwordInput)} />;
};

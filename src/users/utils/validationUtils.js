// utils/validationUtils.js

// Email validation function
export const validateEmail = (email) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(email);
};

// Phone validation function
export const validatePhone = (phone) => {
  const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  return phonePattern.test(phone);
};


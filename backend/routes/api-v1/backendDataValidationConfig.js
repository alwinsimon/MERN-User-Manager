import { body } from "express-validator";

// ============================= User Routes Data Validation =============================

const userSignUpDataValidation = [
  body("name").trim().notEmpty().withMessage("A valid name must be provided."),
  body("email").isEmail().withMessage("Provide a valid email."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("A password must be provided."),
];

const userSignInDataValidation = [
  body("email").isEmail().withMessage("Provide a valid email."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("A valid password must be provided."),
];

// ============================= Admin Routes Data Validation =============================

const adminSignUpDataValidation = [
  body("name").trim().notEmpty().withMessage("A valid name must be provided."),
  body("email").isEmail().withMessage("Provide a valid email."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("A password must be provided."),
  body("adminRegistrationKey")
    .trim()
    .notEmpty()
    .withMessage("A valid Admin Registration Key must be provided."),
];

const adminSignInDataValidation = [
  body("email").isEmail().withMessage("Provide a valid email."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("A valid password must be provided."),
];

const adminUserBlockingDataValidation = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("A valid User Id must be provided."),
];

const adminUserUpdateDataValidation = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("A valid User Id must be provided."),
  body("name").trim().notEmpty().withMessage("A valid name must be provided."),
  body("email").isEmail().withMessage("Provide a valid email."),
];

export {
  userSignUpDataValidation,
  userSignInDataValidation,
  adminSignUpDataValidation,
  adminSignInDataValidation,
  adminUserBlockingDataValidation,
  adminUserUpdateDataValidation,
};

type IValidationEntries = {
  description: string;
  regex?: RegExp;
  test?: (e: string) => boolean;
};

type IPasswordErrorCase = {
  uppercase: IValidationEntries;
  lowercase: IValidationEntries;
  digit: IValidationEntries;
  special: IValidationEntries;
  length: IValidationEntries;
};

type IEmailErrorCase = {
  validity: IValidationEntries;
  empty: IValidationEntries;
};

type IErrorCase = IPasswordErrorCase & IEmailErrorCase;

export type IErrorID = keyof IErrorCase;
export type IValidationResult = {
  description: string;
  name: string;
};
// export type IValidationResult = {
//   isValid: boolean;
//   result: IValidation[];
// };

const passwordMinLength = 8;

var passwordError: IPasswordErrorCase = {
  length: {
    test: (e: string) => e.length > passwordMinLength,
    description: `Harus lebih dari ${passwordMinLength} karakter`,
  },
  uppercase: {regex: /[A-Z]/, description: 'Minimal satu huruf besar'},
  lowercase: {regex: /[a-z]/, description: 'Minimal satu huruf kecil'},
  digit: {regex: /[0-9]/, description: 'Minimal satu angka'},
  special: {regex: /[^A-Za-z0-9]/, description: 'Minimal satu symbol'},
};

export function validatePassword(password: string): IValidationResult[] {
  const validTest = Object.entries(passwordError).flatMap(
    ([name, {test, regex, description}]) => {
      const isValid = test?.(password) || regex?.test(password);
      return isValid ? [] : {description, name};
    },
  );

  return validTest;
}
const mailRegexValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var emailError: IEmailErrorCase = {
  validity: {
    test: (e: string) => mailRegexValidation.test(e),

    description: 'Email tidak valid',
  },
  empty: {
    test: (e: string) => e.length >= 1,
    description: 'Tidak boleh kosong',
  },
};

export function validateEmail(email: string): IValidationResult[] {
  const validTest = Object.entries(emailError).flatMap(
    ([name, {test, regex, description}]) => {
      const isValid = test?.(email) || regex?.test(email);
      return isValid ? [] : {description, name};
    },
  );
  return validTest;
}

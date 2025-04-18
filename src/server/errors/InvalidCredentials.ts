export class InvalidCredentials extends Error {
  code = 401;
  message = "Invalid credentials";
}

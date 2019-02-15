export default class CreatedUser {
  public email: string;
  public name: string;
  public role: string;
  public password: string;

  public constructor(
    email: string,
    name: string,
    role: string,
    password: string,
  ) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.password = password;
  }
}

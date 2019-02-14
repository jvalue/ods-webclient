export default class User {
  public email: string;
  public id: string;
  public name: string;
  public role: string;
  public password: string,

  public constructor(email: string, id: string, name: string, role: string, password: string) {
    this.email = email;
    this.id = id;
    this.name = name;
    this.role = role;
    this.password = password;
  }
}

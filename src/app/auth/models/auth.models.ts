export class Auth {
  name: string;
  password: string;

  constructor(object: any) {
    this.name = object.name;
    this.password = object.password;
  }
}

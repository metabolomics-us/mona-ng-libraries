export class AuthToken {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

export class LoginInfo {
  username: string;
  validFrom: Date;
  validTo: Date;
  roles: string[];
}

export class User {
  username: string;
  password: string;
  roles?: UserRole[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class UserRole {
  role: string;
}

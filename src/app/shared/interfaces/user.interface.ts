export interface IUser {
  uid: string;
  email: string;
  userName: string;
  photoURL: string;
  age: string;
  emailVerified: boolean;
}

export interface IUserRegistration {
  name: string;
  email: string;
  age: string;
  password: string;
}

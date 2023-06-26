export class User {
  id: number;
  firstName: string;
  lastName: string;

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export type UserNetworkType = {
  id: number;
  firstName: string;
  lastName: string;
};

export function isUserNetworkType(user: any): user is UserNetworkType {
  return "firstName" in user && "lastName" in user && "id" in user;
}

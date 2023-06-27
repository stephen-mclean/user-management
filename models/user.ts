export class User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  postalCode: string;

  constructor(user: UserAPIType) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.companyName = user.company.name;
    this.postalCode = user.address.postalCode;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export type UserAPIType = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  company: CompanyAPIType;
  address: AddressAPIType;
};

type AddressAPIType = {
  postalCode: string;
};

type CompanyAPIType = {
  name: string;
};

export function isUserAPIType(user: any): user is UserAPIType {
  return (
    "firstName" in user &&
    "lastName" in user &&
    "id" in user &&
    "email" in user &&
    "company" in user &&
    isCompanyAPIType(user.company) &&
    "address" in user &&
    isAddressAPIType(user.address)
  );
}

export function isCompanyAPIType(company: any): company is CompanyAPIType {
  return "name" in company;
}

export function isAddressAPIType(address: any): address is AddressAPIType {
  return "postalCode" in address;
}

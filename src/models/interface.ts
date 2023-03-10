// import

export interface Iuser {
  username: String;
  email: String;
  password: String | any;
  recieveEmail: Boolean;
  image?: String;
}

export interface IuserModel extends Iuser {
  CheckPassword: (password: String) => Boolean;
  createToken: () => String;
  findByUsername: (email: String, username?: String) => any;
  createUser: (body: Iuser) => any;
}

export interface Iseller {
  fullName: String;
  studio: String;
  nationality: String;
  username: String;
  password: String | any;
  email: String;
  recieveEmail: Boolean;
}

export interface IsellerModel extends Iseller {
  CheckPassword: (password: String) => Boolean;
  createToken: () => String;
  findByUsername: (email: String, username?: String) => any;
  createSeller: (body: Iseller) => any;
}
export interface Cart {
  userId: String;
  ProductId: String;
  bid: Boolean;
  bidPrice?: Number;
  seller: Boolean;
}
export interface Arts {
  sellerId: String;
  artName: String;
  image: { path: string; id: string };
  description: String;
  category: String;
  size: String;
  price: String;
}

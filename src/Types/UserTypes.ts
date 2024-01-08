export type IUserAuth = {
  email: string;
  password: string;
};

export type IUserMain = {
  email: string;
  first_name: string;
  last_name: string;
};

export type IUser = {
  profile_image: string | undefined;
} & IUserMain;

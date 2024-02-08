export interface ILoginCred {
  email: string;
  password: string;
}

export interface IUserAuthStore {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: null;
    address: null;
    is_active: 1;
  };
  message: string;
  token: {
    access_token: string;
    refresh_token: string;
    token_type: string;
  };
}

export interface IImageData {
  img: string;
  title: string;
  author: string;
}

export interface ITextToImageRes {
  image_path: string;
  input_text: string;
  message: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    userId: string;
  }
  
  export interface LoginData {
    user_id: number;
    username: string;
    email: string;
    password: string;
  }
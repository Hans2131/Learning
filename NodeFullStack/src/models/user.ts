export interface User extends UserDto {
  id: string;
}

export interface UserDto {
  email: string;
  password: string;
}

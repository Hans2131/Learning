export interface User extends UserDto {
  id: number;
}

export interface UserDto {
  email: string;
  password: string;
}

export interface UserPayload {
  id: number;
  email: string;
}

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace Express {
//     interface Request {
//       currentUser?: UserPayload;
//     }
//   }
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface User {
      id: number;
    }
  }
}

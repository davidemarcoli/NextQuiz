// import {DefaultSession} from 'next-auth';
//
// declare module 'next-auth' {
//     interface Session {
//         user: {
//             id: string;
//         } & DefaultSession['user'];
//     }
// }
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
  }
}

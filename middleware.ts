export {default} from "next-auth/middleware"

export const config = {matcher: ["/quiz/:id/evaluation", "/quiz/:id/learn", "/quiz/create"]}
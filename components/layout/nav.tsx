import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/layout/Header";
import Header2 from "@/components/layout/Header2";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  // return <Navbar session={session} />;
  // return <Header session={session} />;
  return <Header2 session={session} />;
}

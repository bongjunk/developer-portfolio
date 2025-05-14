import { redirect } from "next/navigation";
import { auth } from "../lib/auth";

export default async function Dashboard() {
  const session = await auth();
  console.log("session", session);

  if (!session) {
    redirect("/login");
  }
  return (
    <main className="p-10 text-center">
      <p className="text-3xl font-bold mb-4">
        {session.user?.name}님 안녕하세요!
      </p>
    </main>
  );
}

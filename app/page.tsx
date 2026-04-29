import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fakeStoreToken")?.value;

  redirect(token ? "/products" : "/login");
}

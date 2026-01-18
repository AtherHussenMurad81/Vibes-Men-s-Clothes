import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions); //authOption for user show of the server components

  return (
    <div className="space-y-20">
      {/* <Test></Test> */}
      {/* <p>{JSON.stringify(session)}</p> */}
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </div>
  );
}

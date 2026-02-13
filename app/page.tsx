// import { Sidebar } from "lucide-react";
import Feed from "@/Component/Feed";
import News from "@/Component/News";
import Sidebar from "@/Component/Sidebar";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {

  const user = await currentUser();
  
  return (
    <div className="pt-20">
      <div className="max-w-6xl flex justify-between gap-8">
      <Sidebar user={user}/>
      <Feed user={user}/>
      <News/>
      </div>
    </div>
  );
}

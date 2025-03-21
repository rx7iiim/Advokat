import HomePage from "./compo";
import { create } from "zustand";
interface PageProps{
  params :Promise <{username:string}>
}
interface FileProps {
  params: { username: string }; // params is an object, not a Promise
}
type Store = {
  usernamee: string

}

export default  async function Page({ params }:PageProps){




 const {username} =await params
return (<HomePage usernamee={username} />)
}


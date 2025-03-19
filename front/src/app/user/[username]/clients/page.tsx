import UserCards from "./compo";
interface PageProps{
  params :Promise <{username:string}>
}
interface ClientsProps {
  params: { username: string }; // params is an object, not a Promise
}
export default async function ({ params }:PageProps){
   const {username}=await params
   return(<UserCards/>)
}
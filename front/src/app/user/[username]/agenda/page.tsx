import AgendaPage from "./compo"
interface PageProps{
  params :Promise <{username:string}>
}
interface agendaProps {
  params: { username: string }; // params is an object, not a Promise
}


export default async function Page({ params }:PageProps){
  const {username} =await params
  return (<AgendaPage/>)
}
import UserCards from "./component";


interface PageProps{
  params :Promise <{username:string}>
}

export default async function page({ params }:PageProps) {
    const {username}= await params
    return (<UserCards/>)
}
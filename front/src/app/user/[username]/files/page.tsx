import FileUploadTable from "./compo";


interface PageProps{
  params :Promise <{username:string}>
}
interface FileProps {
  params: { username: string }; // params is an object, not a Promise
}
export default async function page({ params }:PageProps) {
    const {username}= await params
    return (<FileUploadTable/>)
}
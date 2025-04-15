"use client"
'use client'
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from '../../../components/button';
import Sidebar from '../../../components/Sidebar/Sidebar';
import FileData from './fileData.interface';
import * as dotenv from 'dotenv';
dotenv.config();





 function FileUploadTable() {
  const filedata =[{  index:1
    ,name: "td analyse",
     status: "done",
    date: "50/12/2000",
    updated:"last day",
    clientName:"salim"},{  index:2
      ,name: "td analyse",
       status: "done",
      date: "50/12/2000",
      updated:"last day",
      clientName:"salim"},{  index:3
        ,name: "td analyse",
         status: "done",
        date: "50/12/2000",
        updated:"last day",
        clientName:"salim"},{  index:3
          ,name: "td analyse",
           status: "done",
          date: "50/12/2000",
          updated:"last day",
          clientName:"salim"},{  index:4
            ,name: "td analyse",
             status: "done",
            date: "50/12/2000",
            updated:"last day",
            clientName:"salim"},{  index:5
              ,name: "td analyse",
               status: "done",
              date: "50/12/2000",
              updated:"last day",
              clientName:"salim"},{  index:6 
                ,name: "td analyse",
                 status: "done",
                date: "50/12/2000",
                updated:"last day",
                clientName:"salim"},{  index:6
                  ,name: "td analyse",
                   status: "done",
                  date: "50/12/2000",
                  updated:"last day",
                  clientName:"salim"}]

    const router = useRouter();
   const [username, setUsername] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [fileData, setFileData] = useState<FileData[]>([]);
   /* useEffect(() => {
        const fetchFiles = async () => {
          try {
            const response = await fetch(`${API_URL}/files`);
            if (!response.ok) {
              throw new Error('Failed to fetch files');
            }
            const data = await response.json();
            setFileData(data);
          } catch (error) {
            console.error('Error fetching files:', error);
          }
        };
      
        fetchFiles();
      }, []);*/



// Handle file download
/*const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const response = await fetch(`${API_URL}/download/${fileId}`);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // Handle "Download all" functionality
  const handleDownloadAll = async () => {
    try {
      const response = await fetch(`${API_URL}/download-all`);
      if (!response.ok) {
        throw new Error('Failed to download all files');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'files.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading all files:', error);
    }
  };



  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData object
  
    try {
      const response = await fetch('https://your-backend-api.com/upload', {
        method: 'POST',
        body: formData, // Send the file to the backend
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const result = await response.json();
      console.log('Upload successful:', result);
  
      // Refresh the file list after upload
      const refreshResponse = await fetch('https://your-backend-api.com/files');
      const refreshData = await refreshResponse.json() as FileData[];
      setFileData(refreshData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };*/

  

  useEffect(() => {
      fetch(`${API_URL}/auth/session`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.authenticated || !data.username) {
            router.push("/login"); 
          } else {
            setUsername(data.username);
          }
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
          router.push("/login");
        });
    }, [router]);
    
    if (!username) return <p>Loading...</p>;



  return (
    <div className="flex flex-row overflow-hidden min-h-screen bg-gray-100 text-gray-800 p-2">
        <Sidebar/>
        <div className="invisible w-[260px] h-[100vh]" aria-hidden="true"></div>
        <main className="flex-1 pl-3 pt-2 overflow-y-auto">

    <section className="container px-4 mx-auto bg-white">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-gray-800">Files uploaded</h2>

        <div className="flex items-center mt-4 gap-x-3">
          <button className="w-1/2 px-5 py-2 text-sm text-blue-600 transition-colors duration-200 bg-gray-100 border rounded-lg sm:w-auto hover:bg-gray-200" >
            Download all
          </button>

          <input
  type="file"
  id="file-upload"
  className="hidden" // Hide the default file input
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
        console.log('to be continued')
      //handleUpload(e.target.files[0]); // Call handleUpload with the selected file
    }
  }}
/>
<label
  htmlFor="file-upload" // Link the label to the file input
  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-600 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-700"
>
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3098_154395)">
                <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_3098_154395">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>Upload</span>

</label>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                      <div className="flex items-center gap-x-3">
                        <span>File name</span>
                      </div>
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      File status
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Date uploaded
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Last updated
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Client
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filedata.map((file, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                        
                          <div className="flex items-center gap-x-2">
                            <div className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                            </div>
                            <div>
                              <h2 className="font-normal text-gray-800">{file.name}</h2>
                              <p className="text-xs font-normal text-gray-500">{file.status}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">{file.status}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{file.date}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{file.updated}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{file.clientName}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <Button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg bg-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>previous</span>
        </a>

        <div className="items-center hidden md:flex gap-x-3">
          {[1, 2, 3, '...', 12, 13, 14].map((page, index) => (
            <a key={index} href="#" className={`px-2 py-1 text-sm ${page === 1 ? 'text-blue-600 bg-blue-100/60' : 'text-gray-500'} rounded-md hover:bg-gray-100`}>
              {page}
            </a>
          ))}
        </div>

        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
    </main>
    </div>
  );
};

export default FileUploadTable;
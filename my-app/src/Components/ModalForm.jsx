import React, {useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
toast.configure();



export default function ModalForm({setModalVisable}) {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const toastId = React.useRef(null); // creating a reference to variable toastID

    const handleContactClick = async () => {

        const newBlog = axios.post(`/api/blog/${title}`, {title,text, imageUrl});

        if(newBlog){
            // check if we already displayed a toast, if not we are going to create a new toast that show on screen
            if(toastId.current === null){    
                // toast properties
                toastId.current = toast.success(`Thank you. Your blog has been created`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: true,
                    closeOnClick: true
                });

            } 

            setText('')
            setTitle('')
            setImageUrl('')
            
            setTimeout(() => {
                return window.location.reload()
            }, 900);

        }else{
            // check if we already displayed a toast, if not we are going to create a new toast that show on screen
            if(toastId.current === null){    
                // toast properties
                toastId.current = toast.error(`Something went wrong, please try again`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: true,
                    closeOnClick: true
                });

            } 
        }

    }
    

    
    return (
// <!-- This example requires Tailwind CSS v2.0+ -->
<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              New Blog Creation
            </h3>
            <div className="mt-2">
            <div className="flex flex-col">
                <div className="p-6 mt-8">         
                    <div className="flex flex-col mb-4">
                        <div className="relative">
                            <label htmlFor="title" className="text-sm font-semibold">Title</label>
                            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter a title" type="text" id="title" name='title' className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="relative">
                        <label htmlFor="text" className="text-sm font-semibold">Text</label>
                            <input onChange={(e) => setText(e.target.value)} value={text} placeholder="Enter a short text" type="text" name="text" id="text" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="imageUrl" className="text-sm font-semibold mb-2">ImageUrl <br/><span className='sm text-slate-400'>ex: https://miro.medium.com/max/640/1*XthWUtD_NU-VJ7ESA2qX3A.jpeg</span></label>
                        <input onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} placeholder="Enter a valid image url" type="text" name="imageUrl" id="imageUrl" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                    </div>
                    </div>
            </div>
            </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button onClick={handleContactClick} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          Create Blog
        </button>
        <button onClick={setModalVisable} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Cancel
        </button>
      </div>
    </div>
  </div>
    )
}
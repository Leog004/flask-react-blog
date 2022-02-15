import React, { useState } from "react";


export default function BlogItem ({data, deleteHandle, editHandle}){

    const [showForm, setShowForm] = useState(false)

    const [title, setTitle] = useState(data.title || '')
    const [text, setText] = useState(data.text || '')
    const [imageUrl, setImageUrl] = useState(data.imageUrl || '')

    const HandleForm = () => {
        setShowForm((form) => !form)
    }

    if (!showForm){
        return (
            <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                <div className="w-full block h-full">
                    <img alt={data.id} src={data.imageUrl} className="max-h-40 w-full object-cover"/>
                    <div className="bg-white w-full p-4">
                        <p className="text-indigo-500 text-md font-medium">
                        </p>
                        <p className="text-gray-800 text-xl font-medium mb-2">
                            {data.title}
                        </p>
                        <p className="text-gray-400 font-light text-md">
                            {data.text}
                        </p>
                        <div className="flex justify-between mt-10">
                        <button onClick={HandleForm} type="button" className="py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Edit
                            </button>
                            <button onClick={deleteHandle} type="button" className="py-2 px-4  bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                <div className="w-full block h-full">
                    <div className="bg-white w-full p-4">
                        <h2 className="text-lg font-semibold text-center">Edit {data.title}</h2>
                    <form action="#">
                        <div className="flex flex-col max-w-md">
                            <div className="p-2 md:p-6 mt-8">         
                                    <div className="flex flex-col mb-4">
                                        <div className="relative">
                                            <label htmlFor="title" className="text-sm font-semibold">Title</label>
                                            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter a title" type="text" id="title" name='title' className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <div className="relative">
                                        <label htmlFor="title" className="text-sm font-semibold">Text</label>
                                            <input onChange={(e) => setText(e.target.value)} value={text} type="text" name="text" id="text" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                                        </div>
                                        <div className="flex flex-col mb-4">
                                        <label htmlFor="title" className="text-sm font-semibold">ImageUrl</label>
                                            <input onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} type="text" name="imageUrl" id="imageUrl" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-10">
                                <button onClick={() => {
                                    editHandle([{slug: data.slug, title, text, imageUrl}]);
                                    HandleForm();
                                    }
                                    } type="button" className="py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Save
                                </button>
                                <button onClick={HandleForm} type="button" className="py-2 px-4  bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
import React, {useEffect, useState} from 'react'
import { ModalForm } from '.'

export default function Header(){

    const [showModel, setShowModel] = useState(false)

    const handleClick = () => {
        setShowModel((el) => !el )
    }

    return (
        <header className='bg-gray-50 shadow-sm w-full h-28 dark:bg-[rgb(54,50,50)]'>
            <div className='flex justify-between h-full items-center'>
                {/* Middle, Top charts */}
                <div className='w-full h-full relative '>
                    <nav className='w-full flex justify-center space-x-10 items-center self-center align-middle h-full pb-8'>
                        <button onClick={handleClick} type='button' className='text-base border border-gray-300 rounded-lg px-2 py-2 font-semibold dark:text-white cursor-pointer hover:scale-105 hover:bg-gray-300 hover:shadow-lg transition-all duration-200'>Create a new blog</button>
                    </nav>  
                </div>
                {
                    showModel &&
                    <ModalForm setModalVisable={handleClick } />
                }
            </div>
        </header>
    )
} 
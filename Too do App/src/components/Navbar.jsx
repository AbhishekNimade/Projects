import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-violet-900 text-white py-2'>
            <div className="logo">
                <span className='font-bold text-x1 mx-10'>iTask</span>
            </div>
            <ul className="flex gap-10 mx-10" >
                <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
                <li></li>
            </ul>
        </nav>
        
    )
}

export default Navbar

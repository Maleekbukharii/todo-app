import Link from 'next/link';
import Image from 'next/image'; 
import React from 'react';
import todo from "../public/todo.png"

const Navbar = () => {
  return (
    <main className="sticky top-0 bg-black shadow-md p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
            <div className='mx-4'>
              <Image src={todo} alt="todo logo" width={360} height={180} className="h-10 w-20"/>
            </div>
            <div className= "text-white font-bold text-xl mx-7 ">
              Your Things To Do.
            </div>
        </div>
    </main>
  );
};

export default Navbar;

import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import { RxCross2 } from 'react-icons/rx';

const PostComment = ({commentBox, setCommentBox}:any) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-gray-400 bg-opacity-[.1] backdrop-blur-[1px]"></div>
            <div className="bg-black rounded-xl shadow-lg relative z-10 w-[600px]">
                <div className='flex-between p-2'>
                <div className='flex-center gap-5 p-3'>
                    <span
                        className="text-xl cursor-pointer rounded-full hover:bg-[var(--primary-border)] p-1"
                        onClick={() => setCommentBox(false)}
                    >
                        <RxCross2 />
                    </span>
                </div>
            </div>
    
                    <div className='border-[var(--primary-border)] pb-4 pl-2'>
                        
                    </div>
          </div>
        </div>
      );
}

export default PostComment
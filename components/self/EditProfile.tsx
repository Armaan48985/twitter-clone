import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { FaRegUser } from 'react-icons/fa6';
import { Input } from '../ui/input';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { supabase } from '@/lib/supabase';

const EditProfile = ({ openEditBox, setOpenEditBox}:any) => {

  const Name = useSelector((state: RootState) => state.counter.Name);
  const userId = useSelector((state: RootState) => state.counter.userId);
  const [Bio, setBio] = useState('Bio');
  const [Location, setLocation] = useState('Location');
  const [Website, setWebsite] = useState('Website');
  const [BirthDate, setBirthDate] = useState('Birthdate');

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId);
    
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      if(data && data.length > 0) {
        const user = data[0];
          setBio(user?.bio);
          setLocation(user?.location);
          setWebsite(user?.website);
          setBirthDate(user?.birth_date);
      }
    }

    getUserData();
  }, [])

  console.log(Bio)


  const updateUser = async () => {
    const { data, error } = await supabase.from('users').update({
      bio: Bio,
      location: Location,
      website: Website,
      birth_date: BirthDate
    }).eq('id', userId);

    if (error) {
      console.error('Error updating user:', error.message);
      return;
    }
  
      setOpenEditBox(false);
      console.log('User updated successfully')
 

  }



    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="absolute inset-0 bg-gray-400 bg-opacity-[.1] backdrop-blur-[1px]"></div>
        <div className="bg-black rounded-xl shadow-lg relative z-10 w-[600px]">
          <div className='flex-between p-2'>
            <div className='flex-center gap-5 p-3'>
              <button
                className="text-xl"
                onClick={() => setOpenEditBox(false)}
              >
                &times;
              </button>

              <h1 className='text-xl'>Edit Profile</h1>
            </div>

            <Button variant='outline' className='bg-white rounded-3xl w-16 h-8 mr-4 text-black' onClick={updateUser}>Save</Button>

          </div>
          <div className='h-[120px] bg-slate-800'>
            {/* image */}
          </div>

        <div className='border-b-2 border-[var(--primary-border)] pb-4 pl-2'>
            <div className='p-3'>
                  <div className='flex justify-end py-6 relative'>
                    <div className='absolute top-[-4rem] left-5 p-10 border-black border-4 shadow-xl text-xl bg-yellow-800 rounded-full'><FaRegUser /></div>
                  </div>

                  <div className='py-2 mt-2'>
                    <div className='border-slate-600 border-[1px] rounded-md px-4 py-[.4rem] outline-blue-500'>
                      <p className='text-[13px] text-gray-400'>Name</p>
                      <Input 
                        type='text'
                        className='border-none w-full h-[15px] my-2 text-[1rem] pl-0'
                        placeholder={Name} />
                    </div>
                  </div>

                  <div className='py-2 mt-2'>
                    <div className='border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]'>
                      <p className='text-[13px] text-gray-400'>Bio</p>
                      <Input 
                        type='text'
                        className='border-none w-full h-[15px] my-2 text-[1rem] pl-0'
                        placeholder={Bio} 
                        value={Bio} 
                        onChange={(e) => setBio(e.target.value)} />
                    </div>
                  </div>

                  <div className='py-2 mt-2'>
                    <div className='border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]'>
                      <p className='text-[13px] text-gray-400'>Location</p>
                      <Input 
                        type='text'
                        className='border-none w-full h-[15px] my-2 text-[1rem] pl-0'
                        placeholder={Location} 
                        value={Location} 
                        onChange={(e) => setLocation(e.target.value)} />
                    </div>
                  </div>

                  <div className='py-2 mt-2'>
                    <div className='border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]'>
                      <p className='text-[13px] text-gray-400'>Website</p>
                      <Input 
                        type='text'
                        className='border-none w-full h-[15px] my-2 text-[1rem] pl-0'
                        placeholder={Website} 
                        value={Website} 
                        onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                  </div>

                  <div className='py-2 mt-2'>
                    <div className='border-slate-600 border-[1px] rounded-md px-4 py-[.4rem]'>
                      <p className='text-[13px] text-gray-400'>Birth Date</p>
                      <Input 
                        type='date'
                        className='border-none w-full h-[15px] my-2 text-[1rem] pl-0'
                        placeholder={BirthDate} 
                        value={BirthDate} 
                        onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                  </div>
            </div>
        </div>
        </div>
      </div>
    );
  };

export default EditProfile
import React, { ChangeEvent, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { Input } from '../ui/input'

interface Props {
    options: string[];
  }

const UserSearch: React.FC<Props> = ({ options })=> {
    const [inputValue, setInputValue] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    };
  
    const handleOptionClick = (option: string) => {
      setInputValue(option);
      setFilteredOptions([]);
    };
  
  return (
    <div className='w-[340px] border-none bg-gray-800 rounded-3xl py-1 px-5 mt-5 text-gray-400 text-lg flex-center gap-3'>
          <span className='text-gray-400'>
            <FaMagnifyingGlass />
          </span>
          <Input
            placeholder='Search'
            type='text'
            onChange={handleInputChange}
            className='border-none'
          />
       

        {inputValue.length > 0 && (
          <ul className='bg-gray-800 p-4 min-h-[150px] mt-2 rounded-sm w-[340px] ml-6'>
            {filteredOptions.length === 0 && inputValue.length > 0 && (
              <div className=''>No matching options found</div>
            )}
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
 </div>
  )
}
        
    

export default UserSearch
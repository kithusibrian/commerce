import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { APP_NAME } from '@/lib/constants'
import { getAllCategories } from '@/lib/actions/product.actions'

export default async function Search() {
  const categories = await getAllCategories()

  return (
    <form
      action='/search'
      method='GET'
      className='flex items-center h-10'
    >
      <Select name='category'>
        <SelectTrigger className='h-full bg-gray-100 text-black text-sm px-4 border border-gray-300 rounded-l-md rounded-r-none shadow-none focus:outline-none focus:ring-0'>
          <SelectValue placeholder='All' className='text-black' />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='all'>All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        className='flex-1 h-full text-sm bg-gray-100 text-black border-t border-b border-gray-300 rounded-none focus:ring-0 focus:outline-none'
        placeholder={`Search Site ${APP_NAME}`}
        name='q'
        type='search'
      />

      <button
        type='submit'
        className='h-full px-3 bg-primary text-black text-sm border border-gray-300 border-l-0 rounded-r-md'
      >
        <SearchIcon className='w-5 h-5 text-white' />
      </button>
    </form>
  )
}

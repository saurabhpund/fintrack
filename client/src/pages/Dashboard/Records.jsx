import React from 'react'
import Header from '../../components/Header'
import { FaSearch } from 'react-icons/fa'
import RecordModal from '../../components/RecordModal'

const Records = () => {
  return (
    <>
    <Header />
    <RecordContainer />
    </>
  )
}


const RecordContainer = () => {
  return (
    // create two column one having filters and one having records
    <div className=' px-10 py-3 dark:text-white dark:bg-gray-800 '>
      <div className='flex gap-5 items-center justify-end'>
        <p>Sort By</p>
        <select className='bg-gray-200 outline-none dark:bg-gray-700 p-2 rounded-md'>
          <option value="date">Time (newest first)</option>
          <option value="amount">Time (oldest first)</option>
          <option value="category">Amount (lowest first)</option>
          <option value="category">Amount (highest   first)</option>
        </select>

      </div>
      <div className='flex gap-5 my-3 min-h-screen'>
      <div className='w-1/5 bg-gray-200 dark:bg-gray-700 p-5 rounded-md'>
        <Filters />
      </div>
      <div className='w-full bg-gray-200 dark:bg-gray-700 p-5 rounded-md'>
        {/* Add records here */}
      </div>
      </div>
    </div>
  )

}

const Filters = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className='bg-gray-200 dark:bg-gray-700 rounded-md flex flex-col gap-3'>
      <h1 className='text-3xl font-bold'>Records</h1>
      <button className="inline-flex w-full  my-4 justify-center text-white items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded-full text-base md:mt-0" onClick={() => setShowModal(true)}>+ Add </button>

      {showModal && <RecordModal showModal={showModal} setShowModal={setShowModal} />}

      {/* create search input with search icon at first and then placeholder */}
      <div className='flex items-center bg-gray-300 dark:bg-gray-600 rounded-md p-2'>
        <FaSearch className='text-gray-500' />
        <input type="text" placeholder='Search' className='bg-transparent outline-none ml-2' />
        </div>

    </div>
  )
}

export default Records
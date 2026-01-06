import React from 'react'
import { MdLogout } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'

const LogoutPopup = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full mx-4'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Confirm Logout</h2>
          <button onClick={onCancel} disabled={loading} className='text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50'>
            <IoClose />
          </button>
        </div>
        
        <div className='mb-8'>
          <p className='text-gray-600 text-center text-lg'>
            Are you sure you want to logout? You will need to login again to access your account.
          </p>
        </div>

        <div className='flex gap-4'>
          <button
            onClick={onCancel}
            disabled={loading}
            className='flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className='flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg hover:from-red-800 hover:to-red-900 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? (
              <>
                <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                Logging out...
              </>
            ) : (
              <>
                <MdLogout className='text-xl' />
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutPopup
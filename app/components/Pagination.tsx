import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div>
            
            <div>
               
            </div>
            <div className="flex justify-end items-center my-4 space-x-2">
                <button
                    className={`px-4 py-2 mx-1  ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'border-[1px] text-gray-400 hover:border-[1px] hover:border-blue-500'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ត្រលប់
                </button>
                <span className="bg-blue-500 p-2 px-4 space-x-1 text-white">

                    {/* Page {currentPage} of {totalPages} */}
                    {currentPage}
                </span>
                {/* <p>នៃ</p>
            <span className='bg-blue-200 p-2 px-4 '>
                {totalPages}
            </span> */}
                <button
                    className={`px-4 py-2 mx-1  ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'border-[1px] text-gray-400  hover:border-blue-200'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    បន្ទាប់
                </button>
            </div>
        </div>
    );
};

export default Pagination;

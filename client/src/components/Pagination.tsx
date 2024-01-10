import React from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ currentPage, setCurrentPage }: PaginationProps) => {
  return (
    <div className='pagination_container'>
      <div className='pagination_container-buttons'>
        <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

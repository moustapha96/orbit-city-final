/* eslint-disable react/prop-types */
// import React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }
    return range;
  };

  return (
    <nav className="flex justify-center items-center mt-8 px-4" aria-label="Pagination">
      <ul className="flex flex-wrap justify-center items-center space-x-1 md:space-x-2">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-qyellow disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </li>
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {typeof number === 'number' ? (
              <button
                onClick={() => onPageChange(number)}
                className={`hidden sm:block px-3 py-2 rounded ${currentPage === number
                  ? 'bg-bleu-logo text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-qyellow'
                  }`}
                aria-current={currentPage === number ? 'page' : undefined}
              >
                {number}
              </button>
            ) : (
              <span className="hidden sm:block px-3 py-2">{number}</span>
            )}
          </li>
        ))}
        <li className="sm:hidden">
          <span className="px-3 py-2 text-gray-700">
            {currentPage} / {totalPages}
          </span>
        </li>
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-qyellow disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;


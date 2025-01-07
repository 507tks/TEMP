import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function DefaultPagination({ totalPages, currentPage, onPageChange }) {
  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  return (
    <>
      
      <div className="flex justify-between items-center px-4 py-3 mt-4">
        <div className="flex space-x-2">
          <button
            onClick={prev}
            disabled={currentPage === 1}
            className="px-3 py-1 flex justify-center items-center gap-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
          >
            <FaArrowLeft />
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              className="px-3 flex justify-center items-center py-1 min-w-9 min-h-9 text-sm font-normal text-white rounded-lg "
              key={index + 1}
              variant={currentPage === index + 1 ? "filled" : "outlined"}
              style={{ background: "#3b97dc", width: "30px", height: "35px" }} // Pass the custom blue color as a prop
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={next}
            disabled={totalPages === 0 || currentPage === totalPages}
            className="flex justify-center items-center gap-1 px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
          >
            Next
            <FaArrowRight />
          </button>
        </div>
      </div>{" "}
    </>
  );
}

import React from 'react';
import ReactPaginate from 'react-paginate';
import "./Paginate.css";
import { useSelector } from 'react-redux';
import QuotationTable from "./Table";

const QuoationPaginate = ({ setCurrentPage, currentPage }) => {

  const { pdfData } = useSelector(state => state.pdfStore);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected+1);
  };

    const renderItems = () => {
    return <QuotationTable/>
  };

  return (
    <div className="my-8 bg-white overflow-auto rounded-3xl border border-gray-200 mt-10 mb-10">
      <div>{renderItems()}</div>


      <div className="py-12 px-5 flex justify-between items-center">
        <p className="text-textPrimary font-normal text-sm">
      Showing {currentPage} to {pdfData?.pages} of {pdfData?.total} entries
        </p>
      

      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pdfData.pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        forcePage={localStorage.getItem("currentPage") - 1}
      />

</div>
    </div>
  );
};
export default QuoationPaginate;
import React from 'react';
import ReactPaginate from 'react-paginate';
import "./Paginate.css";
import { useSelector } from 'react-redux';
import ReferenceTable from "./ReferenceTable";

const ReferencePaginate = ({ setCurrentPage }) => {

  const { refs } = useSelector(state => state.generalStore);

  const handlePageClick = (data) => {
    // localStorage.setItem("currentPage",data.selected+1)
    setCurrentPage(data.selected+1);
  };

    const renderItems = () => {
    return <ReferenceTable/>
  };

  return (
    <div>
      <div>{renderItems()}</div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={refs.pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        forcePage={localStorage.getItem("currentPage") - 1}
      />
    </div>
  );
};
export default ReferencePaginate;
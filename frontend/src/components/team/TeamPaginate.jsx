import React from 'react';
import ReactPaginate from 'react-paginate';
import "./Paginate.css";
import { useSelector } from 'react-redux';
import Table from "./Table";

const TeamPaginate = ({ setCurrentPage }) => {

  const { users } = useSelector(state => state.generalStore);

  const handlePageClick = (data) => {
    // localStorage.setItem("currentPage",data.selected+1)
    setCurrentPage(data.selected+1);
  };

    const renderItems = () => {
    return <Table/>
  };

  return (
    <div>
      <div>{renderItems()}</div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={users.pages}
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
export default TeamPaginate;
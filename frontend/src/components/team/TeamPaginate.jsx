import React from 'react';
import ReactPaginate from 'react-paginate';
import "./Paginate.css";
import { useDispatch, useSelector } from 'react-redux';
import Table from "./Table";
import { updateUserOptions } from '../../redux/features/generalSlice';

const TeamPaginate = ({ setCurrentPage, currentPage }) => {
  const dispatch = useDispatch();

  const { users } = useSelector(state => state.generalStore);

  const handlePageClick = (data) => {
    // localStorage.setItem("currentPage",data.selected+1)
        let data1 = {
          field:"currentPage",
          value:data.selected+1
        }
        dispatch(updateUserOptions(data1))
          setCurrentPage(data.selected+1);
        
    
  };

    const renderItems = () => {
    return <Table/>
  };

  return (
    <div className="my-8 bg-white overflow-auto rounded-3xl border border-gray-200">
      <div>{renderItems()}</div>


      <div className="py-12 px-5 flex justify-between items-center">
        <p className="text-textPrimary font-normal text-sm">
      Showing {currentPage} to {users?.pages} of {users?.total} entries
        </p>
      
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
    </div>
  );
};
export default TeamPaginate;
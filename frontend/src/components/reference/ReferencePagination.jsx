import React from 'react';
import ReactPaginate from 'react-paginate';
import "./Paginate.css";
import { useSelector, useDispatch } from 'react-redux';
import ReferenceTable from "./ReferenceTable";
import { current } from '@reduxjs/toolkit';
import { updateRefOptions } from '../../redux/features/generalSlice';

const ReferencePaginate = ({ setCurrentPage, currentPage }) => {
  const dispatch = useDispatch();

  const { refs } = useSelector(state => state.generalStore);

  const handlePageClick = (data) => {
     let data1 = {
              field:"currentPage",
              value:data.selected+1
            }
            dispatch(updateRefOptions(data1))
    setCurrentPage(data.selected+1);
  };

    const renderItems = () => {
    return <ReferenceTable/>
  };

  return (
    <div className="my-8 bg-white overflow-auto rounded-3xl border border-gray-200">
      <div>{renderItems()}</div>


      <div className="py-12 px-5 flex justify-between items-center">
        <p className="text-textPrimary font-normal text-sm">
      Showing {currentPage} to {refs?.pages} of {refs?.total} entries
        </p>
      

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
    </div>
  );
};
export default ReferencePaginate;
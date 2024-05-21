import React, { useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const OrderPagination = () => {
  const {meta} = useLoaderData();
  const {pageCount,page} = meta.pagination;
  const [currentPage,setCurrentPage] = useState(page);
  const {search,pathname} =  useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) =>{
    const searchParams = new URLSearchParams(search);
    searchParams.set('page',pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`)
  }
  const addPageButton = ({pageNumber,activeClass}) => {
    return <button key={pageNumber} onClick={()=>handlePageChange(pageNumber)} 
    className={`join-item btn btn:xs sm:btn-md border-none ${activeClass ? ' bg-base-300 border-base-300':''}`}>
    {pageNumber}
    </button>
  }

  const renderPageButtons = () => {
    const pageButtons = [];
    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));
    // dots
    if (page > 2) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-1'>
          ...
        </button>
      );
    }
    // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }
    // dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-2'>
          ...
        </button>
      );
    }
    // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };
 const handleCurrentPage = (e) => {
  if(parseInt(e.target.value) > 0 && parseInt(e.target.value) <= pageCount) {
    setCurrentPage(parseInt(e.target.value));
  }else{
    setCurrentPage(1);
  }
 }
  if(pageCount<2) return null;
  return (
    <>
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button className="join-item btn btn:xs sm:btn-md" onClick={()=> {
           let prevPage = page-1;
           if(prevPage < 1) prevPage = pageCount
           handlePageChange(prevPage)
          }}>Prev</button>
        {renderPageButtons()}
        <button className="join-item btn btn:xs sm:btn-md" onClick={()=>{
          let nextPage = page+1;
          if(nextPage > pageCount) nextPage =1;
          handlePageChange(nextPage)
        }}>Next</button>
      </div>
    </div>
    <div className="mt-2 flex justify-end">
      <button className='link px-2' onClick={()=> handlePageChange(currentPage)}>Go to Page:</button>
    <input type="text" placeholder={currentPage} onChange={handleCurrentPage} className="input input-bordered input-primary input-sm max-w-14" />
    </div>
    </>
  )
}
export default OrderPagination
import React from 'react'
import Table from '../../components/quotation/Table';

const Quotation = () => {
  return (
      <div className='px-3 md:px-10'>
      <h1 className="text-2xl font-medium mb-4 mt-6 text-textPrimary">Quotations</h1>
      <Table/>
      </div>
  )
}

export default Quotation
import React, {useEffect, useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPdf } from '../../redux/features/pdfSlice';
import MaterialReactTable from 'material-react-table';

const Quotation = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.pdfStore);
  const { companyName } = useSelector(state => state.brandingStore);

  console.log(list)

  const getAllPdfList = (companyName) =>{
    dispatch(getAllPdf(companyName))
  }

  useEffect(() => {
    getAllPdfList(companyName)
  }, [])
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'clientName',
        header: 'Name',
      },
      {
        accessorKey: 'clientEmail',
        header: 'Email',
      },
      {
        accessorKey: 'clientPhone',
        header: 'Phone',
      },
      {
        accessorKey: 'reference',
        header: 'Reference:',
      },
      {
        accessorKey: 'selectCompany',
        header: 'Company',
      },
      {
        accessorKey: 'stateValue',
        header: 'State',
      },
      
    ],
    [],
  );

  return (

      <div className='overflow-auto'>
      <MaterialReactTable
        columns={columns}
        data={list}
        // enableRowSelection //enable some features
        enableColumnOrdering
        enableStickyHeader
        enablePagination={false}
        enableStickyFooter
        enableEditing={false}
        enableRowNumbers
        // positionActionsColumn={false}
        muiTableContainerProps={{ sx: { height: 'auto' } }}
        enableGlobalFilter //turn off a feature
      />
      </div>
  )
}

export default Quotation
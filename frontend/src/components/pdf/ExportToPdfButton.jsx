import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from "../public/img.jpg"

const ExportToPdfButton = ({ columns = [], data = [], fileName = 'test.pdf', logoImage = logo,  ReportName = '', startDate  , endDate, name, phone, email }) => {

  const exportPDFBtnClickHandler = () => {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = logoImage; // Provide the path or URL of logo image

    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 15);
    doc.text("Hello, this is a sample PDF!", 10, 20);
    doc.text("Hello, this is a sample PDF!", 10, 25);
    doc.text("Hello, this is a sample PDF!", 10, 30);
    doc.text("Hello, this is a sample PDF!", 10, 35);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);
    doc.text("Hello, this is a sample PDF!", 10, 10);


    // const test = doc => {
    //   const pageCount = doc.internal.getNumberOfPages()
    //   doc.setFontSize(8)
    //     doc.text('Page',name )

    //   for (var i = 1; i <= pageCount; i++) {
    //     doc.setPage(i)
    //     doc.addImage(logo, 'PNG', 15, 283, 12, 8); // Adjust the coordinates (10, 10) and size (50, 20) as needed

    //     doc.text('Page' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
    //       align: 'center'
    //     })
    //   }
    // }



    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)

      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.addImage(logo, 'PNG', 15, 283, 12, 8); // Adjust the coordinates (10, 10) and size (50, 20) as needed

        doc.text('Page' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
          align: 'center'
        })
      }
    }


   const addHeaders = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)

        doc.text(`Name: ${name}`, 15, 14);
        doc.text(`Phone: ${phone}`, 15, 18);
        doc.text(`Email: ${email}`, 15, 22);
        
        doc.setFontSize(8)
        doc.text(`Start Date: ${startDate}`, 165, 14);
        doc.text(`End Date: ${endDate}`, 165, 18);
        doc.text(`Print Date: ${new Date()}`, 165, 22);


        doc.setFontSize(16)
        doc.text(`${ReportName}`, 87, 18);
        doc.setFontSize(8)
      }
    } 
    const tableColumn = columns.map((col) => col.header);
    const tableRows = data.map((row) => columns.map((col) => row[col.accessorKey]));

    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      margin: { top: 25 }
    }
    );
    // test(doc)
    addFooters(doc)
    addHeaders(doc)
    // Save the PDF
    doc.save(fileName);
  };
  return <button onClick={()=>exportPDFBtnClickHandler()} >hello</button>
};

export default ExportToPdfButton;


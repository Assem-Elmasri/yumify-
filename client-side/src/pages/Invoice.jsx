import React, { useState } from "react";
import { Download } from "lucide-react";
import { id } from "date-fns/locale";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const [data, setData] = useState([
    {
      id: 1,
      orderName: "classNameic Burger",
      quantity: 2,
      price: 45.0,
      total: 90.0,
    },
    {
      id: 2,
      orderName: "Fries (Large)",
      quantity: 1,
      price: 45.0,
      total: 15.0,
    },
    {
      id: 3,
      orderName: "Coca-Cola",
      quantity: 2,
      price: 8.0,
      total: 16.0,
    },
    {
      id: 4,
      orderName: "Chicken Salad",
      quantity: 1,
      price: 55.0,
      total: 55.0,
    },
  ]);

  const downloadPDF = () => {
    const invoice = document.querySelector(".invoice-container");

    html2canvas(invoice, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf");
    });
  };

  return (
    // the body
    <div className="font-['Poppins',_sans-serif] bg-[#f8f9fa] text-[#333]">
      {/* Invoice container */}
      <div className="invoice-container max-w-[800px] my-[30px] mx-auto bg-[#fff] border-[3px] border-solid border-[#FFBE86] rounded-[8px] shadow-[0_4px_15px_0.2px_#1F1F1F] p-[40px] max-xs:p-[13px]">
        <div className="invoice-header flex justify-between items-center border-b-[1px_solid_#eee] pb-[20px] mb-[20px] max-sm:mb-[10px]">
          <h1 className="yumify-logo-text font-['Pacifico',cursive] text-prim text-[40px] max-sm:text-[30px]">
            Yumify
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 max-sm:text-[25px]">
            INVOICE
          </h2>
        </div>
        {/* Order & Customer Details */}
        <div className="invoice-details grid grid-cols-1 grid-cols-2 gap-6 text-sm mb-[25px] max-sm:gap-3">
          <div>
            <p className="font-semibold text-gray-600 max-xs:text-[12px]">
              INVOICE NO:
            </p>
            <p className="text-gray-800 max-xs:text-[10px]">#INV-2023-001</p>
          </div>
          <div className="md:text-right">
            <p className="font-semibold text-gray-600 max-xs:text-[12px]">
              DATE:
            </p>
            <p className="text-gray-800 max-xs:text-[10px]">October 26, 2023</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600 max-xs:text-[12px]">
              BILLED TO:
            </p>
            <p className="text-gray-800 font-medium max-xs:text-[10px]">
              Ahmed Al-Qahtani
            </p>
            <p className="text-gray-600 max-xs:text-[10px]">
              123 Main Street, Riyadh
            </p>
            <p className="text-gray-600 max-xs:text-[10px]">
              ahmed.qahtani@example.com
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-semibold text-gray-600 max-xs:text-[12px]">
              ORDER NO:
            </p>
            <p className="text-gray-800 max-xs:text-[10px]">#ORD-54321</p>
          </div>
        </div>
        {/* Items Table */}
        <div className="item-table mb-[25px]">
          <table className="w-full [&>thead>tr>th]:font-[600] [&>thead>tr>th]:text-[#555] [&>thead>tr>th]:p-[12px-0] [&>thead>tr>th]:border-b-[1px] [&>thead>tr>th]:border-b-[#eee] [&>thead>tr>th]:border-b-solid [&>thead>tr>td]:p-[12px-0] [&>thead>tr>td]:border-b-[1px] [&>thead>tr>td]:border-b-[#eee] [&>thead>tr>td]:border-b-solid">
            <thead>
              <tr>
                <th className="w-1/2 text-left max-xs:text-[12px]">
                  ITEM DESCRIPTION
                </th>
                <th className="text-center max-xs:text-[12px]">QTY</th>
                <th className="text-right max-xs:text-[12px]">UNIT PRICE</th>
                <th className="text-right max-xs:text-[12px]">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, orderName, quantity, price, total }) => {
                return (
                  <tr
                    key={id}
                    className="border-b-[1px] border-b-[#eee] border-b-solid"
                  >
                    <td className="max-xs:text-[12px]">{orderName}</td>
                    <td className="text-center max-xs:text-[12px]">
                      {quantity}
                    </td>
                    <td className="text-right max-xs:text-[12px]">
                      $ {price.toFixed(2)}
                    </td>
                    <td className="text-right max-xs:text-[12px]">
                      $ {total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* summary table */}
        <div className="summary-table flex justify-end mb-[25px] max-xs:mb-[15px]">
          <table className="w-full md:w-1/2 [&>tbody>tr>td]:p-[8px_0] [&>tbody>tr>td]:text-right [&>tbody>tr>td]:font-[500]">
            <tbody>
              <tr>
                <td className="max-xs:text-[14px]">SUBTOTAL</td>
                <td className="max-xs:text-[14px]">$ 176.00</td>
              </tr>
              <tr>
                <td className="max-xs:text-[14px]">TAX (15%)</td>
                <td className="max-xs:text-[14px]">$ 26.40</td>
              </tr>
              <tr className="text-lg max-xs:text-[16px]">
                <td>GRAND TOTAL</td>
                <td className="font-[700] text-[18px]  max-xs:text-[15px]">
                  $ 202.40
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Footer / Notes */}
        <div className="invoice-footer border-t border-gray-200 pt-6 mt-6 border-b-[1px_solid_#eee] pb-[20px] mb-[20px] max-xs:mt-4 max-xs:mb-[15px]">
          <p className="text-xs text-gray-500 text-center max-xs:text-[12px]">
            Thank you for your business! We hope to see you again soon.
          </p>
        </div>
        <div className="no-print flex justify-center space-x-4 mt-8">
          <button
            onClick={() => window.print()}
            className="btn-secondary flex items-center space-x-2 bg-[#f0f0f0] text-[#555] p-[12px_25px] rounded-[8px] font-[600] hover:bg-[#e0e0e0] transition duration-[0.2s]"
          >
            <Download className="w-5 h-5" />

            <span className="max-xs:text-[12px]">Print</span>
          </button>
          <button
            onClick={downloadPDF}
            className="btn-primary flex items-center space-x-2 bg-[#F97316] text-[white] p-[12px_25px] rounded-[8px] font-[600] hover:bg-[#EA580C] transition duration-[0.2s]"
          >
            <Download className="w-5 h-5" />
            <span className="max-xs:text-[12px]">Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

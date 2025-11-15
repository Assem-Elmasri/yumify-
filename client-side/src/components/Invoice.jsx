import { useEffect, useState } from "react";

// --- Mock Components for Single File Execution ---
// Mock Link component (though not strictly needed for an invoice, it's included for consistency)
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

// Mock Logo component, utilizing the custom 'logofont' and 'prim' color
const Logo = ({ logoSize, logoMargin }) => (
  <div className={`font-logofont text-prim ${logoSize} ${logoMargin}`}>
    Yumify
  </div>
);

// Lucide SVG for Print icon
const PrintIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" rx="1" />
  </svg>
);

// Lucide SVG for Download icon
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// --- End Mock Components ---

// Invoice Data
const initialInvoiceData = {
  invoiceNo: "#INV-2023-001",
  date: "October 26, 2023",
  orderNo: "#ORD-54321",
  billedTo: {
    name: "Ahmed Al-Qahtani",
    address: "123 Main Street, Riyadh",
    email: "ahmed.qahtani@example.com",
  },
  items: [
    { description: "Classic Burger", qty: 2, unitPrice: 45.0 },
    { description: "Fries (Large)", qty: 1, unitPrice: 15.0 },
    { description: "Coca-Cola", qty: 2, unitPrice: 8.0 },
    { description: "Chicken Salad", qty: 1, unitPrice: 55.0 },
  ],
  taxRate: 0.15, // 15%
};

const Invoice = () => {
  const [invoice, setInvoice] = useState(initialInvoiceData);
  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    grandTotal: 0,
  });
  const [message, setMessage] = useState(null);

  // Calculate totals whenever items or tax rate change
  useEffect(() => {
    const subtotal = invoice.items.reduce(
      (acc, item) => acc + item.qty * item.unitPrice,
      0
    );

    // Calculate tax and ensure precision
    const tax = parseFloat((subtotal * invoice.taxRate).toFixed(2));

    // Calculate grand total and ensure precision
    const grandTotal = parseFloat((subtotal + tax).toFixed(2));

    setTotals({
      subtotal: subtotal,
      tax: tax,
      grandTotal: grandTotal,
    });
  }, [invoice.items, invoice.taxRate]);

  const handleAction = (action) => {
    setMessage(
      `${action} functionality initiated for Invoice ${invoice.invoiceNo}.`
    );
    setTimeout(() => setMessage(null), 3000);

    if (action === "Print") {
      // window.print();
    }
  };

  // Helper to format currency
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  return (
    <div className="bg-gray-50 min-h-screen p-8 flex justify-center items-start font-sans">
      {/* Message/Alert Box (Replaces forbidden alert()) */}
      {message && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-lg shadow-xl z-50 transition-opacity duration-500">
          {message}
        </div>
      )}

      {/* Invoice Container */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-10 border border-orange-200">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-200 pb-6 mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <Logo logoSize="text-4xl" logoMargin="m-0" />
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 max-sm:text-2xl">
            INVOICE
          </h1>
        </header>

        {/* Billing and Info Section */}
        <div className="flex justify-between text-sm mb-12 max-sm:flex-col max-sm:gap-6">
          {/* Invoice Details (Left) */}
          <div className="flex flex-col gap-1.5 font-medium text-gray-700">
            <p>
              <span className="font-bold text-gray-900 mr-2">INVOICE NO:</span>
              <span className="text-prim">{invoice.invoiceNo}</span>
            </p>
          </div>

          {/* Date and Order (Right) */}
          <div className="flex flex-col gap-1.5 items-end text-sm font-medium text-gray-700 max-sm:items-start">
            <p>
              <span className="font-bold text-gray-900 mr-2">DATE:</span>
              {invoice.date}
            </p>
            <p>
              <span className="font-bold text-gray-900 mr-2">ORDER NO:</span>
              {invoice.orderNo}
            </p>
          </div>
        </div>

        {/* Billed To Section */}
        <div className="mb-10 text-sm">
          <h2 className="font-extrabold uppercase text-gray-800 mb-2 border-b-2 border-prim inline-block pb-0.5">
            Billed To:
          </h2>
          <p className="font-semibold text-gray-900">{invoice.billedTo.name}</p>
          <p className="text-gray-700">{invoice.billedTo.address}</p>
          <p className="text-gray-700">{invoice.billedTo.email}</p>
        </div>

        {/* Items Table */}
        <div className="shadow-lg rounded-xl overflow-hidden mb-12 border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wider font-extrabold text-gray-600">
                <th className="px-6 py-3 text-left">Item Description</th>
                <th className="px-6 py-3 text-center w-20">Qty</th>
                <th className="px-6 py-3 text-right w-32">Unit Price</th>
                <th className="px-6 py-3 text-right w-32">Total</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
              {invoice.items.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-orange-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">
                    {formatCurrency(item.qty * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end">
          <div className="w-full max-w-sm">
            <div className="space-y-2 text-right mb-6 text-gray-700">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="font-medium">SUBTOTAL</span>
                <span className="font-semibold">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              {/* Tax */}
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  TAX ({invoice.taxRate * 100}%)
                </span>
                <span className="font-semibold">
                  {formatCurrency(totals.tax)}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between text-right p-4 rounded-lg bg-orange-50 text-lg font-extrabold border-2 border-prim">
              <span>GRAND TOTAL</span>
              <span className="text-prim">
                {formatCurrency(totals.grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <footer className="mt-16 text-center text-sm text-gray-600 pt-8 border-t border-gray-200">
          Thank you for your business! We hope to see you again soon.
        </footer>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => handleAction("Print")}
            className="flex items-center bg-gray-200 text-gray-800 p-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
          >
            <PrintIcon />
            Print
          </button>
          <button
            onClick={() => handleAction("Download PDF")}
            className="flex items-center bg-prim text-black p-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300 shadow-lg"
          >
            <DownloadIcon />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the main component
export default Invoice;

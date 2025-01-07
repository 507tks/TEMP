import { ActionTable } from "@/component/common/ActionTable/ActionTable";
import { getAllInvoicesThunk } from "@/redux/thunk/invoice";
import { DefaultPagination } from "@/utils/pagination";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SendInvoiceModal from "../invoices/SendInvoiceModal";

const pageSize = 10;

const ViewInvoices = ({ open, toggler, patient }) => {
    const [invoices, setInvoices] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [selectedInvoice, setSelectedInvoice] = useState({});

    const invoiceData = useSelector((state) => state.InvoiceSlice);
    const dispatch = useDispatch();
    const totalPages = invoiceData?.invoiceList?.count ? Math.ceil(invoiceData?.invoiceList?.count / pageSize) : 1;

    const heading = ["Invoice No.", "Customer Name", "Phone No.", "Invoice Date", "Due Date", "Total Amount", "View Invoice"];
    const keys = ["invoice", "invoiceNumber", "customerName", "mobile", "invoiceDate", "invoiceDueDate", "totalAmount", "action"];

    const actions = [
        {
            icon: <FaRegEye size={18} color="green" className="cursor-pointer" />,
            id: "VIEW_INVOICE",
            tooltip: "View Invoice",
            onClickFunction: (invoice) => window.open(invoice.invoicePdfUrl, "_blank")
        },
        // {
        //     icon:
        //         <IoIosSend size={22} color="blue" className="cursor-pointer" />,
        //     id: "SEND_INVOICE",
        //     tooltip: "Send Invoice",
        //     onClickFunction: (invoice) => setSelectedInvoice(invoice)
        // },
    ]

    useEffect(() => {
        if (open) {
            dispatch(getAllInvoicesThunk({ value: patient._id, pageSize, pageIndex }));
        }
    }, [patient, pageIndex,dispatch,open]);

    useEffect(() => {
        setInvoices(invoiceData?.invoiceList?.invoices || []);
    }, [invoiceData]);

    return (
        <Dialog open={open} handler={toggler}>
            <DialogHeader>View Invoices</DialogHeader>
            <DialogBody className=" overflow-y-auto max-h-[40rem] px-8">
                {/* <SimpleTable heading={heading} keys={keys} tableData={invoices} selectedRow={setInvoices} /> */}
                <ActionTable
                    actions={actions}
                    heading={heading}
                    keys={keys}
                    tableData={invoices}
                    loading={invoiceData.loading}
                />
            </DialogBody>
            <SendInvoiceModal
                open={selectedInvoice?._id}
                toggler={() => setSelectedInvoice({})}
                invoice={selectedInvoice}
            />
            <DialogFooter>
                <div className="flex justify-center mt-6">
                    <DefaultPagination currentPage={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />
                </div>
            </DialogFooter>
        </Dialog>
    );
}

export default ViewInvoices

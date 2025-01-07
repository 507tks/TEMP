import { getAllInvoicesThunk } from "@/redux/thunk/invoice";
import { filterActionsByAccess } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvoiceHeader from "./InvoiceHeader";
import { DefaultPagination } from "@/utils/pagination";
import DeleteInvoice from "@/component/modal/invoices/DeleteInvoice";
import { FaRegEye, FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import SendInvoiceModal from "@/component/modal/invoices/SendInvoiceModal";
import InvoiceTable from "./InvoiceTable";

const pageSize = 10;

const Invoice = () => {
    const navigate = useNavigate();

    // const [editPatientModel, setEditPatientModel] = useState(false);
    const [searchParams] = useSearchParams();

    const [selectedInvoice, setSelectedInvoice] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const [sortedData, setSortedData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [sortByName, setSortByName] = useState(false);
    const [sortButtonColor, setSortButtonColor] = useState("bg-blue-500");
    const [isSortButtonDisabled, setIsSortButtonDisabled] = useState(false);
     const [sendInvoiceModal, setSendInvoiceModal] = useState(false);
    const [sortField, setSortField] = useState("");
    const [sortType, setSortType] = useState("-1");
   


    const invoiceData = useSelector((state) => state.InvoiceSlice);
    const role = useSelector((state) => state.userrole?.userRole);

    const dispatch = useDispatch();

    useEffect(() => {
        const invoices = [...(invoiceData?.invoiceList?.invoices || [])];

        if (sortByName) {
            invoices.sort((a, b) => a.customerName.localeCompare(b.customerName));
            setSortButtonColor("bg-gray-300 text-black");
            setIsSortButtonDisabled(true);
        } else {
            setSortButtonColor("bg-blue-500 text-white");
            setIsSortButtonDisabled(false);
        }
        setSortedData(invoices);
    }, [invoiceData, sortByName])

    useEffect(() => {
        let timeout;
        if (searchValue.length > 0) {
            timeout = setTimeout(() => {
                dispatch(
                  getAllInvoicesThunk({
                    pageSize,
                    pageIndex,
                    value: searchValue,
                      sortBy: sortField,
                    sortType:sortType
                  }),
                );
            }, 500);
        } else {
            let value;
            if (searchParams.get("patientId")) {
                value = searchParams.get("patientId");
            } else {
                value = searchValue
            }
            dispatch(
              getAllInvoicesThunk({
                pageSize,
                pageIndex,
                value,
                sortBy: sortField,
                sortType: sortType,
              }),
            );
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [pageIndex, searchValue,sortField,sortType,dispatch,searchParams]);

    const totalPages = invoiceData?.invoiceList?.count ? Math.ceil(invoiceData?.invoiceList?.count / pageSize) : 0;

    const handleSortByName = () => {
        setSortByName((prevSortByName) => !prevSortByName);
    };

    const action = [
      {
        icon: <FaRegEye size={18} color="blue" className="cursor-pointer" />,
        id: "VIEW_INVOICE",
        tooltip: "View Invoice",
        onClickFunction: (invoice) => window.open(invoice.invoicePdfUrl),
      },
      {
        icon: <IoIosSend size={22} color="blue" className="cursor-pointer" />,
        id: "SEND_INVOICE",
        tooltip: "Send Invoice",
        onClickFunction: (invoice) => {
          setSelectedInvoice(invoice);
          setSendInvoiceModal(true);
        },
      },
      {
        icon: (
          <MdEditDocument size={18} color="green" className="cursor-pointer" />
        ),
        id: "EDIT_INVOICE",
        tooltip: "Edit Invoice",
        onClickFunction: (invoice) =>
          navigate(
            `/dashboard/invoices/addInvoice?editMode=true&invoiceId=${invoice._id}`,
          ),
      },
      {
        icon: <FaTrash size={18} color="red" className="cursor-pointer" />,
        id: "DELETE_INVOICE",
        tooltip: "Delete Invoice",
        onClickFunction: (invoice) => {
          setSelectedInvoice(invoice);
          setDeleteModal(true);
        },
      },
    ];
    const filteredActions = filterActionsByAccess(action, role, "invoices");
    return (
      <div className="relative  w-full px-7 py-10">
        <InvoiceHeader
          searchHandler={setSearchValue}
          sortField={sortField}
          setSortField={setSortField}
          totalInvoices={invoiceData?.invoiceList?.count}
          handleSortByName={handleSortByName}
          sortButtonColor={sortButtonColor}
          sortType={sortType}
          setSortType={setSortType}
          isSortButtonDisabled={isSortButtonDisabled}
        />

        <div className="">
          <InvoiceTable
            invoiceData={sortedData}
            pageInfo={{ currentPage: pageIndex - 1, pageSize }}
            selectedRow={setSelectedInvoice}
            actions={filteredActions}
          />
          {/* <ActionTable
            actions={filteredActions}
            tableData={sortedData}
            heading={selectedColumns}
            keys={filteredKeys}
            loading={loading}
            pageInfo={{ currentPage: pageIndex - 1, pageSize }}
            selectedRow={setSelectedInvoice}
          /> */}
        </div>

        <DeleteInvoice
          invoice={selectedInvoice}
          open={deleteModal}
          toggler={() => setDeleteModal((prev) => !prev)}
          pageIndex={pageIndex}
          pageSize={pageSize}
          searchValue={searchValue}
        />
        <SendInvoiceModal
          open={sendInvoiceModal}
          toggler={() => setSendInvoiceModal((prev) => !prev)}
          invoice={selectedInvoice}
        />

        <div className="flex justify-center mt-6">
          <DefaultPagination
            currentPage={pageIndex}
            totalPages={totalPages}
            onPageChange={(page) => setPageIndex(page)}
          />
        </div>
      </div>
    );
}

export default Invoice

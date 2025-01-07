import { deleteInvoiceThunk, getAllInvoicesThunk } from "@/redux/thunk/invoice"
import { Button, Dialog, DialogBody, Typography } from "@material-tailwind/react"
import { useDispatch } from "react-redux"

const DeleteInvoice = ({ open, toggler, invoice, pageIndex, pageSize, searchValue }) => {
    const dispatch = useDispatch()

    const deleteInvoice = async () => {
        await dispatch(deleteInvoiceThunk({ invoiceId: invoice._id }))
        await dispatch(getAllInvoicesThunk({ pageSize, pageIndex, value: searchValue, }))
        toggler();
    }

    return (
        <Dialog open={open} handler={toggler}>
            <DialogBody className="flex justify-center items-center flex-col gap-4">
                <Typography className="text-xl font-semibold text-black">
                    Are you sure you want to delete <span className="text-blue-400 font-bold">{invoice?.invoiceNumber}</span>?
                </Typography>
                <span className="flex gap-4">
                    <Button color="red" onClick={() => toggler()}>
                        No
                    </Button>
                    <Button color="green" onClick={deleteInvoice}>
                        Yes
                    </Button>
                </span>
            </DialogBody>
        </Dialog>
    )
}

export default DeleteInvoice

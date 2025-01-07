import { sendInvoiceThunk } from "@/redux/thunk/invoice";
import { Button, Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SendInvoiceModal = ({ open, toggler, invoice }) => {
    const dispatch = useDispatch();

    const sendMsgHandler = async () => {
        if (invoice) {
            await dispatch(sendInvoiceThunk({ invoiceId: invoice._id }))
                .unwrap()
                .then((data) => {
                    if (data?.data?.success) toast.success("Invoice Sent Successfully");
                    toggler();
                });
        }
    };

    return (
        <Dialog open={open} handler={toggler}>
            <DialogBody className="flex justify-center items-center flex-col gap-4">
                <Typography className="text-xl font-semibold text-black">
                    Send Invoice to <span className="text-blue-400 font-bold">{invoice?.customerName}</span>?
                </Typography>
                <span className="flex gap-4">
                    <Button color="red" onClick={() => toggler()}>
                        No
                    </Button>
                    <Button color="green" onClick={sendMsgHandler}>
                        Yes
                    </Button>
                </span>
            </DialogBody>
        </Dialog>
    );
};

export default SendInvoiceModal;

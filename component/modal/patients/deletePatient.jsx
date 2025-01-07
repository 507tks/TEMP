import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { deletePatientThunk, getPatientThunk } from "../../../redux/thunk/patients";

const DeletePatient = ({ open, toggler, patient, currentPage, searchValue, sortField, sortType }) => {
    const dispatch = useDispatch();

    const deletePatient = async () => {
        await dispatch(deletePatientThunk(patient._id));
        dispatch(getPatientThunk({ searchValue: searchValue, pageIndex: currentPage, sortBy: sortField, sortType: sortType }));
        toggler();
    };

    return (
        <Dialog open={open} handler={toggler}>
            <DialogBody className="flex justify-center items-center flex-col gap-4">
                <Typography className="text-xl font-semibold text-black">
                    Are you sure you want to delete <span className="text-blue-400 font-bold">{patient?.name}</span>?
                </Typography>
                <span className="flex gap-4">
                    <Button color="red" onClick={() => toggler()}>
                        No
                    </Button>
                    <Button color="green" onClick={deletePatient}>
                        Yes
                    </Button>
                </span>
            </DialogBody>
        </Dialog>
    );
};

export default DeletePatient;

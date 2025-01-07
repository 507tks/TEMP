import React, { useState, useEffect } from "react";
import DateModal from "../../component/modal/doctor/DateModal";
import ActionModal from "./ActionModal";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import RescheduleModal from "../../component/modal/doctor/RescheduleModal";
import { useDispatch } from "react-redux";
import { appointmentRescheduleThunk } from "../../redux/thunk/doctor";
function Form({ isOpen, onClose ,id}) {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    beforeDate: "",

    reschedule: false,
    cancel: false,
    afterDate: ""
  });
  const [error, setError] = useState([""]);
  const dispatch = useDispatch();
  const FormTitles = ["Select Date", "What have you decided?", "dekhte h"];

  useEffect(() => {
    setPage(0);
    setFormData({
      beforeDate: "",
      reschedule: false,
      cancel: false,
      afterDate: ""
    });
    setError([""]);
  }, [isOpen]);

  const PageDisplay = () => {
    if (page === 0) {
      return <DateModal formData={formData} setFormData={setFormData} id={id} error={error} page={page} />;
    } else if (page === 1) {
      return <ActionModal formData={formData} setFormData={setFormData} id={id} error={error} page={page} />;
    } else {
      return <RescheduleModal formData={formData} setFormData={setFormData} id={id} error={error} page={page} />;
    }
  };
  const appointmentQueryReschedule = async () => {
    const formattedBeforeDate = new Date(formData.beforeDate);
    formattedBeforeDate.setHours(0, 0, 0, 0);

    const formattedAfterDate = new Date(formData.afterDate);
    formattedAfterDate.setHours(0, 0, 0, 0);
    await dispatch(
      appointmentRescheduleThunk({
        id: id,
        data: {
          status: "Reschedule",
          date: formattedBeforeDate.getTime(),
          rescheduleDate: formattedAfterDate.getTime()
        }
      })
    );
  };
  const appointmentQueryCancel = async () => {
    const formattedDate = new Date(formData.beforeDate);
    formattedDate.setHours(0, 0, 0, 0);

    await dispatch(
      appointmentRescheduleThunk({
        id: id,
        data: {
          status: "Cancel",
          date: formattedDate.getTime()
        }
      })
    );
  };
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogBody className="flex flex-col items-center gap-4">
        <div className="progressbar w-full bg-gray-200 rounded-full">
          <div style={{ width: `${(page + 1) * (100 / FormTitles.length)}%` }} className="bg-purple-600 h-2 rounded-full"></div>
        </div>

        {PageDisplay()}

        <div className="footer flex justify-center">
          {page === 1 && formData.cancel ? (
            <>
              <Button color="blue" buttonType="filled" size="lg" onClick={() => setPage((currPage) => Math.max(0, currPage - 1))} disabled={page === 0} className="mr-4">
                Prev
              </Button>
              <Button
                color="green"
                buttonType="filled"
                size="lg"
                onClick={() => {
                  appointmentQueryCancel();
                  onClose();
                }}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button color="blue" buttonType="filled" size="lg" onClick={() => setPage((currPage) => Math.max(0, currPage - 1))} disabled={page === 0} className="mr-4">
                Prev
              </Button>
              <Button
                color={page === FormTitles.length - 1 ? "green" : "blue"}
                buttonType="filled"
                size="lg"
                onClick={() => {
                  if (page === FormTitles.length - 1) {
                    if (formData.afterDate) {
                      appointmentQueryReschedule();

                      onClose();
                    } else {
                      setError((prevError) => {
                        const updatedError = [...prevError];
                        updatedError[page] = "Date is required";
                        return updatedError;
                      });
                    }
                  } else {
                    if (page === 0 && formData.beforeDate) {
                      setPage((currPage) => currPage + 1);
                    } else if (page === 1) {
                      if (formData.reschedule) {
                        setPage((currPage) => currPage + 1);
                      } else {
                        // setError();
                        setError((prevError) => {
                          const updatedError = [...prevError];
                          updatedError[page] = "Please select an action";
                          return updatedError;
                        });
                      }
                    } else {
                      // setError("Date is required")
                      setError((prevError) => {
                        const updatedError = [...prevError];
                        updatedError[page] = "Date is required";
                        return updatedError;
                      });
                    }
                  }
                }}
              >
                {page === FormTitles.length - 1 ? "Submit" : "Next"}
              </Button>
            </>
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default Form;

import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAppointmentCountThunk } from '../../redux/thunk/doctor';
const ActionModal = ({ formData, setFormData, id,error ,page}) => {

  const dispatch = useDispatch();
  const [count, setCount] = useState();
  const dateA = new Date(formData.beforeDate);
  dateA.setHours(0, 0, 0, 0);
  const timestamp = dateA.getTime();

  const handleActionChange = (event) => {
    const { value } = event.target;
    if (value === "reschedule") {
      setFormData({
        ...formData,
        reschedule: true,
        cancel: false
      });
    } else if (value === "cancel") {
      setFormData({
        ...formData,
        reschedule: false,
        cancel: true
      });
    }
  };

  useEffect(() => {
    const get = async () => {
      const cot = await dispatch(getAppointmentCountThunk({ id: id, date: timestamp }));

      setCount(cot?.payload?.totalAppointment);
    };

    get();
  }, [dispatch,id,timestamp]);

  return (
    <div className="action-modal p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Choose Action</h2>
      <p className="text-center text-purple-600 mb-4">
        Total appointments scheduled for this day are: <span className="font-bold text-purple-600">{count}</span>
      </p>
      <div className="flex items-center mb-4">
        <input type="radio" id="reschedule" name="action" value="reschedule" checked={formData.reschedule} onChange={handleActionChange} className="mr-2" />
        <label htmlFor="reschedule" className="cursor-pointer">
          Reschedule Appointments
        </label>
      </div>
      <div className="flex items-center">
        <input type="radio" id="cancel" name="action" value="cancel" checked={formData.cancel} onChange={handleActionChange} className="mr-2" />
        <label htmlFor="cancel" className="cursor-pointer">
          Cancel Appointments
        </label>
      </div>
      {error[page] && <p className="text-center text-red-500 text-sm mt-2">{error[page]}</p>}
    </div>
  );
};

export default ActionModal;

import { Chip, Menu, MenuHandler, MenuItem, MenuList, Tooltip } from "@material-tailwind/react";
import { IoMale, IoFemale, IoSettingsSharp } from "react-icons/io5";
import { FaTransgender } from "react-icons/fa6";

export const genderHandler = (data) => {
  if (data === "MALE") {
    return (
      <td className="text-center">
        <div className="flex justify-center items-center">
          <Chip
            variant="ghost"
            color="blue"
            value={
              <div className="flex items-center">
                <IoMale size={14} className="mr-2" />
                <span>MALE</span>
              </div>
            }
          />
        </div>
      </td>
    );
  }
  if (data === "FEMALE") {
    return (
      <td className="text-center">
        <div className="flex justify-center items-center">
          <Chip
            variant="ghost"
            color="pink"
            value={
              <div className="flex items-center">
                <IoFemale size={14} className="mr-2" />
                <span>FEMALE</span>
              </div>
            }
          />
        </div>
      </td>
    );
  }
  if (data === "OTHER") {
    return (
      <td className="text-center">
        <div className="flex justify-center items-center">
          <Chip
            variant="ghost"
            color="amber"
            value={
              <div className="flex items-center">
                <FaTransgender size={14} className="mr-2" />
                <span>OTHER</span>
              </div>
            }
          />
        </div>
      </td>
    );
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return (
        <td className="text-center">
          <Chip variant="ghost" color="green" value="Completed" />
        </td>
      );
    case "Cancelled":
      return (
        <td className="text-center">
          <Chip variant="ghost" color="red" value="Cancelled" />
        </td>
      );
    case "Scheduled":
      return (
        <td className="text-center">a
          <Chip variant="ghost" color="indigo" value="Scheduled" />
        </td>
      );
    default:
      return <td className="text-center">{status}</td>;
  }
};
export const ActionHandler = ({ actions, selectedRow, data, src }) => {
  if (actions.length === 0) {
    return (
      <div className="flex justify-center items-center">No Actions</div>
    )
  }
  if (actions.length === 1) {
    const action = actions[0];
    return (
      <div>
        <div className="flex justify-center items-center">
          <Tooltip content={action.tooltip}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                action.onClickFunction(data);
                selectedRow(data);
              }}
            >
              {action.img ? (
                <img src={action.img} className="w-5" alt={action.tooltip} />
              ) : (
                action.icon
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className={`flex justify-center items-center`}>
          <Menu placement="right-start" className="flex justify-center items-center">
            <MenuHandler>
              <p className="cursor-pointer">
                <IoSettingsSharp />
              </p>
            </MenuHandler>
            <MenuList className="flex flex-row h-auto p-0 gap-0 items-center">
              {actions.map((x, index) => {
                if ((src && (x.tooltip === "Cancel Appointment" || x.tooltip === "Reschedule Appointment" || x.tooltip === "Add Prescription" || x.tooltip === "Mark Complete") && data.status === "Cancelled") || ((x.tooltip === "Reschedule Appointment" || x.tooltip === "Cancel Appointment" || x.tooltip === "Mark Complete") && data.status === "Completed") || ((x.tooltip === "Send Prescription" || x.tooltip === "Prescription History") && !data?.prescriptionPdfUrl)) return null;
                if (x.tooltip === "VIew Invoice" && !data.invoicePdfUrl) return null;
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      x.onClickFunction(data);
                      selectedRow(data);
                    }}
                    className="flex flex-col items-center"
                  >
                    <Tooltip content={x.tooltip}>
                      <div className="flex items-center gap-2">
                        {x.img ? <img src={x.img} className="w-5" alt={x.tooltip} /> : x.icon}
                      </div>
                    </Tooltip>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>

  );
};


import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Cancel, PendingActions } from "@mui/icons-material";
import { CalendarIcon } from "lucide-react";
import { MdDone } from "react-icons/md";
 // Replace with actual icons or import

export function AppointmentStatusCard({ data }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm h-full">
      <CardHeader
        variant="gradient"
        color="blue" // Customize the color
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
      >
        <CalendarIcon className="w-6 h-6 text-white" /> {/* Main Icon */}
      </CardHeader>

      <CardBody className="p-6 pt-16">
        {" "}
        {/* Adjust padding and top spacing */}
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          Appointment Status
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          {data.map((status, index) => {
            let icon;
            switch (status.title) {
              case "Pending":
                icon = <PendingActions className="w-6 h-6 text-blue" />;
                break;
              case "Completed":
                icon = <MdDone className="w-6 h-6 text-green" />;
                break;
              case "Cancelled":
                icon = <Cancel className="w-6 h-6 text-red" />;
                break;
              default:
                icon = <CalendarIcon className="w-6 h-6 text-gray" />;
            }

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {icon}
                  <Typography variant="small" color="blue-gray">
                    {status.title}
                  </Typography>
                </div>
                <Typography variant="h6" color="blue-gray">
                  {status.value || 0}
                </Typography>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}

// Set default props and prop types for type safety
AppointmentStatusCard.defaultProps = {
  data: [],
};

export default AppointmentStatusCard;

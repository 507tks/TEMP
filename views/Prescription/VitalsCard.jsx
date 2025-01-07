import {
  Button,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from 'react';
import { toast } from 'react-toastify';
function VitalsCard({ vitalsValue, setVitalsValue, patientData }) {
  const [showEdtInput, setShowEdtInput] = useState(false);

  const handleBloodPressureChange = (systolic, diastolic) => {
    setVitalsValue((prevState) => ({
      ...prevState,
      bloodPressure: `${systolic}/${diastolic}`,
    }));
  };

  const handleSystolicChange = (e) => {
    const systolic = e.target.value;
    const [_, diastolic] = vitalsValue.bloodPressure.split("/");
    handleBloodPressureChange(systolic, diastolic || "");
  };

  const handleDiastolicChange = (e) => {
    const diastolic = e.target.value;
    const [systolic, _] = vitalsValue.bloodPressure.split("/");
    handleBloodPressureChange(systolic || "", diastolic);
  };
  const handleVitalsChange = (id, value) => {
    setVitalsValue((prev) => ({ ...prev, [id]: value }));
  };
  const handleVitalInputChange = (vital, value) => {
    if (vital === "bloodPressure") {
      const sanitizedValue = value.replace(/[^0-9/]/g, "");
      let formattedValue = sanitizedValue;
      if (sanitizedValue.length > 2 && !sanitizedValue.includes("/")) {
        formattedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(3)}`;
      }
      if (sanitizedValue.match(/\d+\/\d+/)) {
        formattedValue = sanitizedValue;
      }
      handleVitalsChange(vital, formattedValue);
    } else {
      handleVitalsChange(vital, value);
    }
  };
  const calculateEstimatedDeliveryTime = (lmpDate) => {
    if (lmpDate) {
      const lmp = new Date(lmpDate);
      const edt = new Date(lmp);
      edt.setMonth(edt.getMonth() + 9);
      edt.setDate(edt.getDate() + 7);
      return edt.toISOString().split("T")[0];
    }
    return null;
  };

  const handleLmpChange = (value) => {
    if (!value) {
      handleVitalsChange("lastMenstrualPeriod", null);
      handleVitalsChange("estimatedDateOfDelivery", null);
      setShowEdtInput(false);
      return;
    }

    const inputDate = new Date(value);
    const currentDate = new Date();
    if (inputDate > currentDate) {
      toast.error("Invalid date");
      return;
    }

    handleVitalsChange("lastMenstrualPeriod", value);
  };

  const handleToggleEdt = () => {
    if (showEdtInput) {
      handleVitalsChange("estimatedDateOfDelivery", "");
      setShowEdtInput(false);
    } else {
      if (vitalsValue.lastMenstrualPeriod) {
        const calculatedEdt = calculateEstimatedDeliveryTime(
          vitalsValue.lastMenstrualPeriod,
        );
        handleVitalsChange("estimatedDateOfDelivery", calculatedEdt);
      }
      setShowEdtInput(true);
    }
  };
  return (
    <Card className="p-2 w-full shadow-lg">
      <Typography variant="h4" className="mb-6 font-semibold text-gray-800">
        Patient Vitals
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          { name: "pulseRate", unit: "bpm", type: "number" },
          { name: "bodyWeight", unit: "kg", type: "number" },
          { name: "bodyTemperature", unit: "°F", type: "number" },
          { name: "SpO2", unit: "%", type: "number" },
        ].map((vital, idx) => (
          <div key={idx} className="relative w-full">
            {vital.name === "bloodPressure" ? (
              <>
                <Input
                  label={vital.name.replace(/([A-Z])/g, " $1").trim()}
                  id={vital.name}
                  type="text"
                  value={vitalsValue[vital.name] || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (!value.includes("/") && value.length > 3) {
                      value = `${value.slice(0, 3)}/${value.slice(3)}`;
                    }
                    handleVitalInputChange(vital.name, value);
                  }}
                  placeholder="120/80"
                  color="blue"
                  className="w-full pr-12 pl-3"
                />
              </>
            ) : (
              <Input
                label={vital.name.replace(/([A-Z])/g, " $1").trim()}
                id={vital.name}
                type={vital.type}
                min={0}
                value={vitalsValue[vital.name]}
                onChange={(e) =>
                  handleVitalInputChange(vital.name, e.target.value)
                }
                color="blue"
                className="w-full pr-12"
              />
            )}
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              {vital.unit}
            </span>
          </div>
        ))}
        <div className="relative flex items-center">
          <div className="relative border-2 border-gray-400 rounded-md px-2 py-1 w-full focus-within:border-blue-700">
            <label className="absolute -top-2 left-3 bg-white px-1 text-blue-700 text-xs">
              blood Pressure
            </label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="120"
                value={vitalsValue.bloodPressure.split("/")[0] || ""}
                onChange={handleSystolicChange}
                className="p-1 w-12 text-gray-700 focus:outline-none focus:ring-0 appearance-none"
                style={{ MozAppearance: "textfield" }}
              />
              <span className="px-1 text-gray-600">/</span>
              <input
                type="text"
                placeholder="80"
                value={vitalsValue.bloodPressure.split("/")[1] || ""}
                onChange={handleDiastolicChange}
                className="p-1 w-12 text-gray-700 focus:outline-none focus:ring-0 appearance-none"
                style={{ MozAppearance: "textfield" }}
              />
              <span className="ml-2 text-gray-600">mmHg</span>
            </div>
          </div>
        </div>
        {patientData && patientData.gender === "FEMALE" && (
          <>
            <Input
              label="Last Menstrual Period"
              id="lastMenstrualPeriod"
              type="date"
              value={vitalsValue.lastMenstrualPeriod}
              onChange={(e) => handleLmpChange(e.target.value)}
              color="blue"
            />
            <Button
              type="button"
              onClick={handleToggleEdt}
              color="blue"
              className=" px-1 py-2 "
            >
              {showEdtInput ? "Hide & Clear EDT" : "Calculate EDT"}
            </Button>

            {showEdtInput && (
              <Input
                label="Estimated Delivery Time (EDT)"
                id="estimatedDateOfDelivery"
                type="date"
                value={vitalsValue.estimatedDateOfDelivery || ""}
                onChange={(e) =>
                  handleVitalsChange("estimatedDateOfDelivery", e.target.value)
                }
                color="blue"
              />
            )}
          </>
        )}
      </div>
    </Card>
  );
}

export default VitalsCard
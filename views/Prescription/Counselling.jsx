import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { FaRegSave, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCounsellingTemplate,
  deleteCounsellingTemplate,
  getCounsellingTemplatesList,
} from "@/redux/thunk/appointments";

const Counselling = ({ counselingText, setCounselingText }) => {
  const [openCounselingDialog, setOpenCounselingDialog] = useState(false);
  const [counselingTemplateName, setCounselingTemplateName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const dispatch = useDispatch();
  const counselingTemplates = useSelector(
    (state) => state.AppointmentSlice?.counselingTemplates?.result,
  );

  const handleOpenCounselingDialog = () => setOpenCounselingDialog(true);
  const handleCloseCounselingDialog = () => {
    setOpenCounselingDialog(false);
    setCounselingTemplateName("");
  };

  const handleSaveCounsellingTemplate = () => {
    if (!counselingTemplateName || counselingText.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTemplate = {
      name: counselingTemplateName,
      counselling: counselingText,
    };
    dispatch(addCounsellingTemplate(newTemplate))
      .unwrap()
      .then(() => dispatch(getCounsellingTemplatesList()))
      .then(handleCloseCounselingDialog);
  };

  const handleDeleteCounselingTemplate = (templateName) => {
    dispatch(deleteCounsellingTemplate(templateName))
      .unwrap()
      .then(() => dispatch(getCounsellingTemplatesList()));
  };

  const handleTemplateSelect = (value) => {
    const selected = counselingTemplates.find(
      (template) => template.name === value,
    );
    if (selected) {
      setCounselingTemplateName(selected.name);
      setSelectedTemplate(selected.name);
      setCounselingText(selected.counselling);
    }
  };

  return (
    <Card className="p-6 h-full w-full shadow-lg">
      <div className="mb-4  border-b-2 border-blue-500">
        {" "}
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h4" className="font-semibold text-gray-800">
            Counseling
          </Typography>
          <div className="flex items-center justify-between space-x-4">
            <button
              color="blue"
              onClick={handleOpenCounselingDialog}
              className="flex items-center gap-2 px-4 py-2 h-12 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <FaRegSave /> Save as Template
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between gap-2 items-center text-md">
            <div className=" text-md flex gap-3 text-gray-800 font-semibold">
              Selected Template: {selectedTemplate}
            </div>
            {counselingTemplateName && (
              <button
                className="text-red-500"
                onClick={() =>
                  handleDeleteCounselingTemplate(counselingTemplateName)
                }
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="w-48 mt-4 mb-4 ">
            <Select
              value={selectedTemplate || ""}
              onChange={handleTemplateSelect}
              label="Available Template"
            >
              {counselingTemplates?.length > 0 ? (
                counselingTemplates.map((template) => (
                  <Option key={template.name} value={template.name}>
                    {template.name}
                  </Option>
                ))
              ) : (
                <Option value="" disabled>
                  No Templates Available
                </Option>
              )}
            </Select>
          </div>
        </div>
      </div>

      <Textarea
        label="Counseling"
        value={counselingText || ""}
        onChange={(e) => setCounselingText(e.target.value)}
        color="blue"
        className="w-full lg:h-52"
      />

      <Dialog open={openCounselingDialog} handler={handleCloseCounselingDialog}>
        <DialogHeader>Save Template</DialogHeader>
        <DialogBody>
          <Input
            value={counselingTemplateName}
            onChange={(e) => setCounselingTemplateName(e.target.value)}
            label="Template Name"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleCloseCounselingDialog}
          >
            Cancel
          </Button>
          <Button color="blue" onClick={handleSaveCounsellingTemplate}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default Counselling;

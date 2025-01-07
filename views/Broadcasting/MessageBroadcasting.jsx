import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Checkbox, Table, TableHead, TableBody, TableRow, TableCell, Box, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPatientThunk } from "../../redux/thunk/patients";
import { DefaultPagination } from "../../utils/pagination";
import axios from "axios";
import { baseURL } from "../../component/constants/defaultValues";
import { toast } from "react-toastify";
import { DashboardNavbar } from "@/widgets/layout";

const MessageBroadcasting = () => {
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState({
    content: "",
    border: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [fetchingPatients, setFetchingPatients] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCount, setSelectedCount] = useState(0); // State for selected count
  const pageSize = 10;
  const dispatch = useDispatch();
  const patientData = useSelector((state) => state.PatientSlice);
  

  const templates = [
    {
      id: "broadcast_message",
      label: "Broadcast Message",
      content: `Hi {{patientName}} ! 

We are glad to inform you that you have been successfully registered with Hospital name. 
Here are your appointment details : 
Date: some date
Time: some time
Assigned Doctor: Doctor name

Have a nice day!`,
      editable: true
    }
  ];

  useEffect(() => {
    // setFetchingPatients(true);
    dispatch(getPatientThunk({ value: searchQuery, pageSize, pageIndex: currentPage }))//.finally(() => setFetchingPatients(false));
  }, [dispatch, currentPage, searchQuery]);

  useEffect(() => {
    const currentPatients = patientData?.patientList?.allPatients?.patients || [];
    const currentPatientIds = currentPatients.map((patient) => patient._id);
    const allSelected = currentPatientIds.every((id) => selectedPatients.includes(id));
    const noneSelected = currentPatientIds.every((id) => !selectedPatients.includes(id));

    if (allSelected) {
      setSelectAll(true);
    } else if (noneSelected) {
      setSelectAll(false);
    } else {
      setSelectAll(false); // Partially selected, default to false
    }

    setSelectedCount(selectedPatients.length); // Update selected count
  }, [selectedPatients, patientData, currentPage]);

  const handlePatientSelection = (selectedPatientId) => {
    setSelectedPatients((prevPatients) => {
      const newSelectedPatients = prevPatients.includes(selectedPatientId) ? prevPatients.filter((id) => id !== selectedPatientId) : [...prevPatients, selectedPatientId];
      return newSelectedPatients;
    });
  };

  const handleSelectAll = () => {
    const currentPatients = patientData?.patientList?.allPatients?.patients || [];
    const currentPatientIds = currentPatients.map((patient) => patient._id);

    if (selectAll) {
      setSelectedPatients((prevPatients) => prevPatients.filter((id) => !currentPatientIds.includes(id)));
    } else {
      setSelectedPatients((prevPatients) => [...prevPatients, ...currentPatientIds.filter((id) => !prevPatients.includes(id))]);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleBroadcast = async () => {
    if (selectedPatients.length === 0) {
      toast.error("Please select at least one patient to broadcast the message.");
      return;
    }

    const patientNames = selectedPatients
      .map((id) => {
        const patient = patientData?.patientList?.allPatients?.patients.find((p) => p._id === id);
        return patient || null; // Return the patient object or null if not found
      })
      .filter((patient) => patient !== null); // Filter out null values if needed

    const finalMessage = `Hi ${patientNames}, ${message.content} Thanks`;

    const payload = {
      patientIds: selectedPatients,
      campaignName: "Default",
      doctorId: "65acd2f5d8e7a673531c34ac",
      message: finalMessage
    };

    setLoading(true);

    try {
       await axios.post(baseURL + `/broadcast/broadcastMsg`, payload);
      toast.success("Message broadcasted successfully!");
      setSelectedPatients([]); // Deselect all patients
      setSelectAll(false); // Reset Select All state
    } catch (error) {
      console.error("Error broadcasting message:", error);
      toast.error("Failed to broadcast message.");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageChange = (event) => {
    setMessage({ ...message, content: event.target.value });
  };

  const handleMessageClick = () => {
    setMessage((prev) => ({ ...prev, border: true }));
  };

  const handleTemplateChange = (event) => {
    const selectedTemplate = templates.find((t) => t.id === event.target.value);
    if (selectedTemplate) {
      setTemplate(selectedTemplate.id);
      setMessage({ content: selectedTemplate.content, editable: selectedTemplate.editable });
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSelectAll(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const totalPages = patientData?.patientList?.allPatients?.count ? Math.ceil(patientData.patientList.allPatients.count / pageSize) : 0;


  return (
    <div className=" sm:px-6 py-6 sm:py-10">
      <div className="flex h-[10vh] items-center w-full justify-between bg-themeLight ">
        <DashboardNavbar
          inputField={
            <div className="text-black">
              <h1 className="font-bold text-2xl "> Message Broadcasting</h1>
            </div>
          }
        />
      </div>
      <Container
        className="bg-themeLight"
        style={{
          borderRadius: "8px",
        }}
      >
        <TextField
          select
          label="Select Template"
          value={template}
          onChange={handleTemplateChange}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          {templates.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box position="relative" marginBottom="1rem">
          <Typography
            variant="caption"
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              background: "#ffffff",
              padding: "0 4px",
              fontWeight: 500,
              color: "#7D55F3",
              zIndex: 1,
            }}
          >
            Message
          </Typography>
          <TextField
            label=""
            placeholder="Type your message here"
            value={message.content}
            onChange={handleMessageChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            onClick={handleMessageClick}
            InputProps={{
              style: {
                paddingTop: "24px",
                paddingBottom: "8px",
              },
            }}
            style={{
              border: message.border ? "2px solid #7D55F3" : "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled={true}
          />
        </Box>

        <Box marginBottom="1rem">
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            margin="normal"
            variant="outlined"
            className="w-1/2 "
          />
        </Box>

        <Box display="flex" alignItems="center" marginBottom="1rem">
          <Button
            variant="outlined"
            onClick={handleSelectAll}
            className="border-[#7D55F3] text-[#7D55F3] hover:bg-[#7D55F3] w-fit"
          >
            {selectAll ? "Deselect All" : "Select All"}
          </Button>
          <Typography
            variant="body2"
            style={{
              marginLeft: "auto",
              fontSize: "1.25rem",
              textAlign: "right",
              color: "#333",
              fontWeight: 600,
              display: "block",
              padding: "0.5rem 1rem",
              backgroundColor: "#f4f4f4",
              borderRadius: "4px",
            }}
          >
            {selectedCount} : Selected
          </Typography>
        </Box>
        <Table className="min-w-full bg-themeLight">
          <TableHead>
            <TableRow className="bg-blue-900">
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "white",
                  padding: "8px 16px",
                  borderRight: "1px solid #e0e0e0",
                }}
              >
                Select
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "white",
                  padding: "8px 16px",
                }}
                className="whitespace-nowrap"
              >
                Patient Information
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "white",
                  padding: "8px 16px",
                }}
                className="whitespace-nowrap"
              >
                Location
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="bg-themeLight">
            {patientData?.patientList?.allPatients?.patients?.map(
              (patient, index) => (
                <TableRow
                  key={patient._id}
                  hover
                  onClick={() => handlePatientSelection(patient._id)}
                  style={{
                    cursor: "pointer",
                    height: "30px",
                  }}
                >
                  <TableCell
                    style={{
                      borderRight: "1px solid #e0e0e0",
                      borderBottom: "none",
                      fontWeight: 500,
                      padding: "4px 8px",
                    }}
                  >
                    {currentPage * pageSize + index + 1 - 10}
                    <Checkbox
                      checked={selectedPatients.includes(patient._id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatientSelection(patient._id);
                      }}
                      color="primary"
                      style={{ transform: "scale(0.8)" }}
                    />
                  </TableCell>
                  {/* Patient Information Column */}
                  <TableCell
                    style={{
                      borderBottom: "none",
                      fontWeight: 500,
                      padding: "8px",
                      whiteSpace: "nowrap",
                      lineHeight: "1.5",
                    }}
                  >
                    <div>
                      <strong>Name:</strong>{" "}
                      {patient.name
                        ? patient.name.charAt(0).toUpperCase() +
                          patient.name.slice(1)
                        : ""}
                    </div>
                    <div>
                      <strong>Phone:</strong> {patient.phone}
                    </div>
                    <div>
                      <strong>Gender:</strong> {patient.gender}
                    </div>
                    <div>
                      <strong>Age:</strong>
                      {patient.age}
                    </div>
                  </TableCell>
                  {/* Location Column */}
                  <TableCell
                    style={{
                      borderBottom: "none",
                      fontWeight: 500,
                      padding: "8px",
                      whiteSpace: "nowrap",
                      lineHeight: "1.5",
                    }}
                  >
                    <div>
                      <strong>State:</strong> {patient.state || "N/A"}
                    </div>
                    <div>
                      <strong>City:</strong> {patient.city || "N/A"}
                    </div>
                    <div>
                      <strong>Pin:</strong> {patient.pincode || "N/A"}
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>

        <Box className="flex flex-col items-center mt-4 space-y-4">
          <DefaultPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleBroadcast}
            disabled={loading}
            className="w-fit"
          >
            {loading ? "Broadcasting..." : "Broadcast Message"}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default MessageBroadcasting;

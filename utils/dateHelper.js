export const toMMMDDYYY = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(parseInt(date)).toLocaleDateString("en", options);
  return formattedDate;
};

export const getCalenderDate = (timestamp) => {
  const date = new Date(timestamp * 1);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const inputFormatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(0);
  return `${year}-${month}-${day}`;
};
export function epochToDatetime(epochTime) {
  // Convert epoch time to milliseconds
  const milliseconds = epochTime;

  // Create a new Date object
  const dateObject = new Date(milliseconds);

  // Extract date components
  const day = ("0" + dateObject.getDate()).slice(-2);
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  const year = dateObject.getFullYear();

  // Combine date components
  const date = year + "-" + month + "-" + day;

  // Extract time component
  const time = dateObject.toTimeString().slice(0, 8);

  // Create object with fields date and time
  const result = {
    date: date,
    time: time
  };
  return result;
}

export const getTodayDateForInput = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
export const getDateAndTime = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime
  };
};

export const getTime = (timestamp) => {
  const dateObject = new Date(timestamp);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const period = hours < 12 ? "AM" : "PM";

  const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, "0");

  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;

  return formattedTime;
};

export const getDate = (timestamp) => {
  const dateObject = new Date(timestamp);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};

export const getTimestampFromYYYYMMDD = (dateString) => {
  const dateObject = new Date(dateString + "T00:00:00+05:30");
  const timestamp = dateObject.getTime();
  return timestamp;
};

export const convertTimeStringToMilliseconds = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMilliseconds = (hours * 60 + minutes) * 60 * 1000;
  return totalMilliseconds;
};
export const getDepartmentNames = (departments) => {
  if (!departments || !Array.isArray(departments)) return "";
  return departments.map((dept) => dept.name).join(", ");
};

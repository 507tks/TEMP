import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-20 text-center text-5xl text-red-400">404</div>
      {/* <div className="mt-14 text-center text-xl text-gray-800">
        WE ARE SORRY, PAGE NOT FOUND
      </div> */}
      <div className="mt-14 text-center text-xl text-gray-800">Something went wrong</div>

      <div className="flex justify-center mt-5">
        <Button color="blue" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default Error;

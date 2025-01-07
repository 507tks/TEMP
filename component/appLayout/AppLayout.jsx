import Navbar from "./NavBar";
import SideBar from "./SideBar";

export const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <SideBar >
        <div className="bg-custom-grey h-full min-h-screen mt-16 rounded ">{children}</div>
      </SideBar>
    </>
  );
};

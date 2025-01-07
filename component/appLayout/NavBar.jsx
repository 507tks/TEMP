import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { emitter } from '../../utils/eventEmitter';
import { Typography } from '@material-tailwind/react';
import robodoc from '../../assets/robodoc.png';
import { authenticationHandler, clearLoginData } from '../../redux/slice/login';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const user = localStorage.getItem('user');
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logoutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userRole')
        dispatch(clearLoginData());
        dispatch(authenticationHandler(false));
        emitter.emit('logout')
        window.location.reload();
    }
    return (

        <div className="bg-white z-50 fixed top-0 w-full p-3 px-5 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <img
                    src={robodoc}
                    className="h-10 me-7"
                    alt="robodoc"
                />
                <Typography className="text-theme text-xl font-semibold sm:text-2xl  dark:text-white">
                    RoboSensy
                </Typography>
            </div>
            <div className="flex items-center">
                <span className='text-black'>{user ? user.toUpperCase() : ''}</span>
                <div className="ml-4 relative border border-custom-theme p-2 rounded-full cursor-pointer" onClick={toggleDropdown}>
                    <FaUser className='text-theme' />
                    {isDropdownOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md">
                            <div className="py-1">
                                <span onClick={logoutHandler}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

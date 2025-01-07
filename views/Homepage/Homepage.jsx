import React from "react";
import HomepageHeader from "./Homepageheader";
import "./Scrollbar.css";
import Dashboard from "../../assets/Dashboard.png";
import userImage from "../../assets/user_img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";

const Homepage = () => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "grey",
                    right: "-1.5rem"
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "grey",
                    left: "-1.5rem"
                }}
                onClick={onClick}
            />
        );
    }

    let screenSize = null;
    if (window && window.screen) {
        screenSize = window.screen.width;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: screenSize && screenSize < 641 ? 1 : 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const data = [
        {
            name: "Dr Saira",
            img: userImage,
            review: "RoboSensy has revolutionized the way we manage our clinic. Scheduling appointments is now effortless, and our patients appreciate the digital prescriptions. Highly recommend!"
        },
        {
            name: "Dr Sakeena",
            img: userImage,
            review: "Managing patient records and staff tasks has never been easier. The intuitive interface and robust document management features of RoboSensy have significantly improved our clinic's efficiency."
        },
        {
            name: "Nasreen",
            img: userImage,
            review: "With RoboSensy, we have streamlined our entire workflow. From appointment scheduling to patient communication, everything is seamless. It's truly the best clinic management solution out there."
        }
    ];

    return (
        <div>
            <Helmet>
                <title>RoboSensy - Efficient Clinic Management</title>
                <meta name="description" content="RoboSensy helps you to manage appointments, patients, staff, and other tasks efficiently. Generate Digital Prescriptions, manage documents like test reports, and streamline your clinic management with ease." />
                <meta name="keywords" content="clinic management, appointment scheduling, digital prescriptions, patient management, healthcare software" />
                <meta name="author" content="RoboSensy" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <HomepageHeader />

            <div>
                <div className="flex flex-col justify-center items-center">
                    <div className="lg:w-3/4 p-16 w-full">
                        <div className="text-center font-bold lg:text-4xl text-lg">Manage your Clinic or Hospital with RoboSensy</div>
                        <div className="text-center lg:text-xl text-md pt-8">RoboSensy helps you to manage appointments, patients, staffs and other stuff efficiently. You can even generate Digital Prescription and send this to patients and manage other documents like test reports etc.</div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-3/4">
                        <div className="flex justify-center align-middle">
                            <div className="p-4 flex justify-center">
                                <img src={Dashboard} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center pt-20">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-black-600">RoboSensy Features</h1>
                    </header>
                    <div className="w-3/4 flex-col lg:flex lg:flex-wrap sm:flex-col md:flex-col lg:flex-row justify-between sm:justify-center md:justify-center p-8">
                        <div className="w-full sm:w-full md:w-full lg:w-5/12 rounded-2xl bg-yellow-100 mb-4 mr-4">
                            <div className="p-4">
                                <div className="font-bold text-center text-xl">Seamless Appointment Management</div>
                                <div className="flex justify-center align-center items-center pt-8">
                                    <ul className="list-disc text-left text-lg pl-4">
                                        <li>Easy appointment scheduling</li>
                                        <li>Analytical view of appointments</li>
                                        <li>Customized whatsapp messages to patients</li>
                                        <li>Digital prescription generation</li>
                                    </ul>
                                </div>
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                            </div>
                        </div>
                        <div className="w-full lg:w-5/12 rounded-2xl bg-purple-100 mb-4 mr-4">
                            <div className="p-4">
                                <div className="font-bold text-center text-xl">Electronic Medical Record Keeping</div>
                                <div className="flex justify-center align-center items-center pt-8">
                                    <ul className="list-disc text-left text-lg pl-4">
                                        <li>Keep patients demographic data</li>
                                        <li>Keep medical history of patients for better diagnosis</li>
                                        <li>Digital Prescription</li>
                                        <li>Customized Notes</li>
                                    </ul>
                                </div>
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center pt-20">
                    <div className="container mx-auto p-2">
                        <header className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-black-600">Why Choose RoboSensy?</h1>
                            <p className="mt-4 text-lg">Your ultimate solution for efficient and streamlined clinic management.</p>
                        </header>

                        <section className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Comprehensive Appointment Management</h2>
                            <p className="mb-6">With RoboSensy, scheduling and managing appointments becomes a breeze. No more double bookings or missed appointments. Our system ensures that your calendar is always up-to-date, allowing you to focus on providing quality care to your patients.</p>

                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Seamless Patient Management</h2>
                            <p className="mb-6">Keep all patient information at your fingertips. RoboSensy allows you to store, access, and update patient records with ease. From personal details to medical history, everything is organized and easily retrievable, ensuring that you always have the information you need to make informed decisions.</p>

                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Efficient Staff Management</h2>
                            <p className="mb-6">Managing your clinic staff has never been easier. Assign tasks, monitor performance, and streamline communication all in one place. RoboSensy helps you ensure that your clinic runs smoothly and efficiently.</p>

                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Digital Prescriptions</h2>
                            <p className="mb-6">Say goodbye to handwritten prescriptions and hello to digital convenience. With RoboSensy, you can generate and send digital prescriptions directly to your patients. This not only saves time but also reduces the risk of errors, enhancing patient safety and satisfaction.</p>

                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Document Management</h2>
                            <p className="mb-6">RoboSensy offers robust document management capabilities. Store and organize test reports, medical certificates, and other important documents securely. Access them anytime, anywhere, and ensure that your clinic remains paperless and efficient.</p>

                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">User-Friendly Interface</h2>
                            <p className="mb-6">Designed with healthcare professionals in mind, RoboSensy boasts an intuitive and user-friendly interface. No steep learning curves – just straightforward, easy-to-use tools that help you manage your clinic effortlessly.</p>

                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Enhanced Patient Communication</h2>
                            <p className="mb-6">Improve patient engagement with automated reminders, follow-ups, and easy communication channels. Keep your patients informed and involved in their care, leading to better health outcomes and increased patient loyalty.</p>

                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Data Security</h2>
                            <p className="mb-6">We understand the importance of patient confidentiality. RoboSensy employs state-of-the-art security measures to protect your data, ensuring that all patient information remains confidential and secure.</p>
                        </section>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center pt-20 pb-20">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-black-600">What Doctors Say About Us</h1>
                    </header>
                    <div className="w-3/4 m-auto">
                        <div className="mt-20">
                            <Slider {...settings}>
                                {data.map((d, index) => (
                                    <div key={index} className="bg-white h-[450px] text-black rounded-xl drop-shadow">
                                        <div className="h-56 rounded-t-xl flex justify-center items-center">
                                            <img src={d.img} className="h-44 w-44 rounded-full" />
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-4 p-4 text-center">
                                            <p className="font-bold text-xl">{d.name}</p>
                                            <p>{d.review}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <footer className="bg-white text-black mt-3 p-2">
                    <div className="container mx-auto flex flex-wrap justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold text-blue-500">RoboSensy</h2>
                            <p className="mt-2">Your ultimate solution for efficient and streamlined clinic management.</p>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <h3 className="font-semibold">Contact Us</h3>
                            <ul className="mt-2">
                                <li>Email: developer@algodive.com</li>
                                <li>Phone: +918619131789, +918051646539</li>
                                <li>Address: sector 143, Noida</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center mt-6 border-t border-gray-700 pt-4">
                        <p>&copy; 2024 RoboSensy. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Homepage;

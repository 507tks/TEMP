import React, { useState } from "react";
import "./Homepage.css";
import laptopImage from "./assets/laptopimage.png";
import robologo from "./assets/robosensy_logo.png";
import algologo from "./assets/algodive_logo.png";
import doctorImg from "./assets/Doctor_profile.png";
import contactImg from "./assets/contact.png";
import Navbar from "./Navbar.homepage";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { toast } from "react-toastify";

const Homepage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(); // Validate before submitting

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Display errors if any
      return; // Stop submission if errors exist
    }

    setIsSubmitting(true); // Disable the button during submission

    try {
      // const response = await axios.post(
      //   baseURL + `/contact/addContact`,
      //   formData,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      toast.success("Message Submit successfully!");
      // Clear form fields after successful submission
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      toast.error("Failed to broadcast message.");
      console.error("Error submitting form:", error);

      // Handle server-side validation errors (if any)
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };



  const testimonials = [
    {
      name: "Dr Saira",
      text: "RoboSensy has revolutionized the way we manage our clinic. Scheduling appointments is now effortless, and our patients appreciate the digital prescriptions. Highly recommend!",
      image: doctorImg
    },
    {
      name: "Dr Sakeena",
      text: "Managing patient records and staff tasks has never been easier. The intuitive interface and robust document management features of RoboSensy have significantly improved our clinic's efficiency.",
      image: doctorImg
    },
    {
      name: "Nasreen",
      text: "With RoboSensy, we have streamlined our entire workflow. From appointment scheduling to patient communication, everything is seamless. It's truly the best clinic management solution out there.",
      image: doctorImg
    }
  ];


  return (
    <div className="App">
      <main>
        <div className="navbar">
          <Navbar />
        </div>
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>RoboSensy</h1>
            <p>The Future of Healthcare</p>
            <p className="description">
              Revolutionizing patient care with AI-driven solutions. Experience smarter diagnostics and personalized healthcare like never before.
            </p>
            <button className="book-demo">BOOK DEMO</button>
          </div>
          <div className="hero-image">
            <img src={robologo} alt="RoboSensy" />
          </div>
        </section>

        <section id="services" className="services">
          <div className="services-heading">
            <h1>Our Services</h1>
          </div>
          <div className="services-content">
            <ul className="services-list">
              <li>
                <span className="custom-span" role="img" aria-label="appointment">
                  📅
                </span>
                Appointment Scheduling & Management
              </li>
              <li>
                <span className="custom-span" role="img" aria-label="medicine">
                  💊
                </span>
                Medicine Management
              </li>
              <li>
                <span className="custom-span" role="img" aria-label="patient">
                  👨‍⚕️
                </span>
                Patient Management
              </li>
              <li>
                <span className="custom-span" role="img" aria-label="prescription">
                  📝
                </span>
                Prescription Generator
              </li>
              <li>
                <span className="custom-span" role="img" aria-label="invoice">
                  💵
                </span>
                Invoice Generator
              </li>
              <li>
                <span className="custom-span" role="img" aria-label="analytics">
                  📊
                </span>
                Analytic Dashboard
              </li>
              <li>
                <span className="custom-span" role="img" aria-label="hrms">
                  📋
                </span>
                HRMS Portal
              </li>
            </ul>
            <div className="services-image">
              <img src={laptopImage} alt="RoboSensy Dashboard" />
            </div>
          </div>
        </section>




        <section id="testimonials" className="testimonials">
          <div className="testimonial-heading">
            <h1>What Doctors Say About Us</h1>
          </div>
          <div className="testimonial-cards">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <h3>{testimonial.name}</h3>
                <p>{testimonial.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h1 className="contact-heading">Contact Us</h1>
          <div id="contact" className="contact">
            <div className="contact-content">
              <div className="contact-details">

                <p>
                  For any questions or concerns call
                  8619131789
                  or fill out our form
                </p>
                <img
                  src={contactImg}
                  alt="Contact Us"
                  className="contact-image"
                />
              </div>

              <div className="contact-forms">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "SUBMIT NOW"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="footer">
            <div className="logo-section">
              <img src={robologo} alt="RoboSensy Logo" className="logo-image" />
              <div className="logo-text">
                <h1>RoboSensy</h1>
                <p>The Future of Healthcare</p>
              </div>
            </div>
            <div className="social-section">
              <FaInstagram />
              <FaFacebookF />
              <FaTwitter />
              <ImLinkedin />
            </div>
            <div className="powered-by-section">
              <p>Powered By</p>
              <img src={algologo} alt="Powered By Logo" className="powered-by-image" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;

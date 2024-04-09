import { useState } from "react";
import axios from "axios";
import styles from "./BookAppointment.module.css";

const POST_API = "https://jsonplaceholder.typicode.com/posts";

function BookAppointment() {
    const formDataInit = {
        firstName: "",
        lastName: "",
        email: "",
        selectedDoctor: "",
        where: "",
        when: "",
    };

    const [formData, setFormData] = useState(formDataInit);
    const [loading, setLoading] = useState(false);
    const [booked, setBooked] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await axios.post(POST_API, formData).catch(() => {
            alert("failed to fetch");
        });
        console.log(response);
        setBooked(true);
        setLoading(false);
    };

    const handleCancel = () => {
        setBooked(false);
    };

    return (
        <div id="bookAppointment">
          {booked ? (
            <div>
                <h1>Appointment Booked Successfully</h1>
                <br />
                <button type="button" className={styles.button} onClick={handleCancel}>
                    Cancel Appointment
                </button>
            </div>
          ) : (
            <main>
               <h1>Book a Session</h1>
               <p>Fill the form below to book a virtual session with your Doctor</p>

               {loading ? (
                 <h1>Scheduling the appointment...</h1>
               ) : (
                 <form className={styles.formbooking} onSubmit={handleSubmit}>
                    <div>
                        <p className="fw-bold">Basic Info</p>
                        <label htmlFor="FirstName">First Name:</label>
                        <input
                          type="text"
                          name="firstName"
                          id="FirstName"
                          className="input-box"
                          value={formData.fName}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="LastName">Last Name:</label>
                        <input
                          type="text"
                          name="lastName"
                          id="LastName"
                          className="input-box"
                          value={formData.lName}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="email">Email : </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="input-box"
                          value={formData.mail}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                    </div>
                    <br />

                    <div>
                        <p className="fw-bold">Doctor</p>
                        <select
                          className="form-select"
                          name="selectedDoctor"
                          value={formData.doctor}
                          onChange={(e) => handleInputChange(e)}
                          >
                          <option value="">Select your doctor</option>
                          <option value="John Hopkins">Dr. John Hopkins</option>
                          <option value="Abdul Kalam">Dr. Abdul Kalam</option>
                          <option value="Suresh Joshi">Dr. Suresh Joshi</option> 
                        </select>
                    </div>
                    <br />

                    {formData.selectedDoctor && (
                     <div className="radio-btn">
                      <p className="fw-bold">Where ?</p>
                      <div className="form-check">
                        <input
                          type="radio"
                          name="where"
                          id="meet"
                          value="Google Meet"
                          onChange={(e) => handleInputChange(e)}
                        />
                        <label htmlFor="meet">Google Meet</label>
                     </div>

                     <div className="form-check">
                       <input
                         type="radio"
                         name="where"
                         id="Phone"
                         value="Phone"
                         onChange={(e) => handleInputChange(e)}
                       />
                       <label htmlFor="Phone">Phone</label>
                     </div>
                     <br />
                  </div>
                )}
                 {formData.selectedDoctor && (
                   <div>
                     <p className="fw-bold">When ?</p>
                     <input
                       type="datetime-local"
                       id="meeting-time"
                       name="when"
                       onChange={(e) => handleInputChange(e)}
                     />
                </div>
              )}
              <br />
              <input 
                type="submit"
                value="Confirm Booking"
                onClick={(e) => handleInputChange(e)}
               />
             </form>
            )}
          </main>
         )}
        </div>
    );    
}

export default BookAppointment;
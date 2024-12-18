import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterManager.css";
import illusregister from "../assets/register.png";
import axios from "axios";

const RegisterManager = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    telp: "",
    alamat: "",
  });

  // Insialisasi untuk error message jika username sudah tersedia
  const [errorMessage, setErrorMessage] = useState()

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://beimpal.telkom.cloud/register", formData);

      // Handle the response as needed (e.g., show a success message)
      console.log("Response:", response.data);

      // Reset the form after successful submission
      setFormData({
        username: "",
        password: "",
        telp: "",
        alamat: "",
      });
      window.location.href = '/loginManager'
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error:", error);
      setErrorMessage("Username already exist")
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div id="register-body">
      {/*body*/}

      {/*Header */}
      <div className="register-company font-poppins text-white font-semibold text-2xl text-center pt-[30px] sm:text-left sm:pl-[30px] sm:text-3xl">
        <h2>Industrial</h2>
      </div>
      {/*End Header */}

      <div className="register-container flex items-center justify-center mt-[3rem] gap-[12rem]">
        <div className="register-form flex flex-col items-center p-5 rounded-2xl sm:w-[400px] sm:rounded-3xl">
          <h2 className="font-poppins font-bold text-white text-xl sm:text-2xl">Join This Website</h2>

          {/*username */}
          <h3 className="font-poppins font-medium text-white text-sm mt-[1rem] sm:text-md">Username</h3>
          <input className="mt-3 w-[250px] bg-transparent border-2 px-2 py-1 rounded-md text-white sm:w-[280px]" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} />
          {/*end username */}

          {/*password */}
          <h3 className="font-poppins font-medium text-white text-sm mt-[1rem] sm:text-md">Password</h3>
          <input type="password" className="mt-3 w-[250px] bg-transparent border-2 px-2 py-1 rounded-md text-white sm:w-[280px]" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
          {/*end password */}

          {/*Telp */}
          <h3 className="font-poppins font-medium text-white text-sm mt-[1rem] sm:text-md">Telp</h3>
          <input type="text" className="mt-3 w-[250px] bg-transparent border-2 px-2 py-1 rounded-md text-white sm:w-[280px]" placeholder="Telp" name="telp" value={formData.telp} onChange={handleInputChange} />
          {/*end Telp */}

          {/*Alamat */}
          <h3 className="font-poppins font-medium text-white text-sm mt-[1rem] sm:text-md">Alamat</h3>
          <input type="text" className="mt-3 w-[250px] bg-transparent border-2 px-2 py-1 rounded-md text-white sm:w-[280px]" placeholder="Alamat" name="alamat" value={formData.alamat} onChange={handleInputChange} />
          {/*end Alamat */}

          {/*button */}
          <button className="btn bg-sky-500 w-[250px] font-poppins font-medium text-white py-1 mt-6 rounded-md sm:w-[280px] hover:bg-sky-700 border-0 capitalize" onClick={handleSubmit}>
            Register
          </button>
          {/*end button */}

          <div>
            {errorMessage && <p className="text-error mt-4 text-center text-sm">{errorMessage}</p>}
          </div>

          <h2 className="text-white font-poppins text-[12px] mt-4 sm:text-[16px]">
            Have an Account ?{" "}
            <span className="btn text-sky-500 cursor-pointer capitalize border-0 p-0 hover:bg-transparent bg-transparent" onClick={() => navigate("/LoginManager")}>
              Login
            </span>
          </h2>
        </div>
        <img src={illusregister} className="register-illus hidden sm:flex w-[500px]" alt="Registration Illustration" />
      </div>
      {/*end body */}
    </div>
  );
};

export default RegisterManager;

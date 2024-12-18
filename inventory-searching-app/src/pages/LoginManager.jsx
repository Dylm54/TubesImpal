import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginManager.css";
import illuslogin from "../assets/login2.png";
import axios from "axios";

const LoginManager = () => {
  const navigate = useNavigate();

  // Insialisasi untuk error message jika username atau password salah
  const [errorMessage, setErrorMessage] = useState()

  // Inisialisasi state dengan properti 'kode'
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  // Fungsi untuk meng-handle perubahan input
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  // Fungsi untuk meng-handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: state.username,
      password: state.password,
    };
    // Mengirimkan data ke API menggunakan Axios
    axios
      .post("https://beimpal.telkom.cloud/login-manager", userData)
      .then((response) => {
        const { token } = response.data; // Ambil token dari respons API
        
        // Simpan token ke dalam cookie dengan nama 'token' dan waktu kedaluwarsa
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Contoh: Simpan selama 7 hari
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;

        console.log(response.status, response.data);
        console.log(document.cookie);

        navigate('/managerHome')
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Username or password is incorrect")
      });
  };
  return (
    <div id="loginman-body">
      {/*body */}

      {/*Header */}
      <div className="loginman-company font-poppins text-white font-semibold text-2xl text-center pt-[30px] sm:text-left sm:pl-[30px] sm:text-3xl">
        <h2>Industrial</h2>
      </div>
      {/*End Header */}

      <form onSubmit={handleSubmit}>
        <div className="loginman-container flex justify-center mt-[7rem] sm:gap-[10rem] sm:mt-[5rem]">
          <div className="loginman-form w-[300px] flex flex-col items-center p-7 rounded-3xl sm:w-[400px]">
            <h2 className="font-poppins font-bold text-white text-2xl">Welcome Back</h2>

            {/*username */}
            <h3 className="font-poppins font-medium text-white text-md mt-[2rem]">Username</h3>
            <input className="mt-3 w-[250px] bg-transparent border-2 px-2 py-1 rounded-md text-white sm:w-[280px]" placeholder="Username" name="username" onChange={handleChange} value={state.username} />
            {/*end username */}

            {/*password */}
            <h3 className="font-poppins font-medium text-white text-md mt-[1rem]">Password</h3>
            <input type="password" className="mt-3 w-[250px] bg-transparent border-2 px-2 py-1 rounded-md text-white sm:w-[280px]" placeholder="Password" name="password" onChange={handleChange} value={state.password} />
            {/*end password */}

            {/*button */}
            <button type="submit" className="btn bg-sky-500 w-[250px] font-poppins font-medium text-white py-2 mt-9 rounded-md sm:w-[280px] capitalize hover:bg-sky-700 border-0">
              SignIn
            </button>
            {/*end button */}

            <div>
              {errorMessage && <p className="text-error mt-4 text-center text-sm mb-[-15px]">{errorMessage}</p>}
            </div>

            <h2 className="text-white font-poppins text-[12px] mt-8 sm:text-[16px]">
              Don't Have an Account ?{" "}
              <span className="text-sky-500 cursor-pointer btn bg-transparent p-0 border-0 capitalize hover:bg-transparent" onClick={() => navigate("/RegisterManager")}>
                Register
              </span>
            </h2>
          </div>
          <img src={illuslogin} alt="login" className="loginman-illus w-[450px] hidden sm:flex" />
        </div>
      </form>

      {/*end body */}
    </div>
  );
};

export default LoginManager;
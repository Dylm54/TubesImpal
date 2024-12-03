import React, { useState } from "react";
import "./LoginAdmin.css";
import illusAdm from "../assets/login2.png";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LoginAdmin = () => {
  // Inisialisasi state dengan properti 'kode'
  const [state, setState] = useState({
    kode: "",
  });

  // Insialisasi untuk error message jika kode admin tidak valid
  const [errorMessage, setErrorMessage] = useState()


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
      kode: state.kode,
    };
    // Mengirimkan data ke API menggunakan Axios
    axios
      .post("https://industrial-backend.azurewebsites.net/login-admin", userData)
      .then((response) => {
        const { token } = response.data; // Ambil token dari respons API

        // Simpan token ke dalam cookie dengan nama 'token' dan waktu kedaluwarsa
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Contoh: Simpan selama 7 hari
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;

        console.log(response.status, response.data);
        console.log(document.cookie);
        window.location.href = '/adminHome'
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Invalid Admin code")
      });
  };

  return (
    <div id="loginadm-body">
      {/*body */}

      {/*Header */}
      <div className="loginadm-company font-poppins text-white font-semibold text-2xl text-center pt-[30px] sm:text-left sm:pl-[30px] sm:text-3xl">
        <h2>Industrial</h2>
      </div>
      {/*End Header */}

      <form onSubmit={handleSubmit}>
        <div className="loginadm-container flex justify-center mt-[9rem] sm:gap-[10rem] sm:mt-[5rem]">
          <div className="loginadm-form w-[300px] flex flex-col items-center p-7 rounded-3xl sm:w-[400px] sm:h-[290px] sm:mt-[4rem]">
            <h2 className="font-poppins font-bold text-white text-xl sm:text-2xl">Welcome Back</h2>

            {/*kode */}
            <h3 className="font-poppins font-medium text-white text-md mt-[2rem]">Kode Pegawai</h3>
            <input type="password" className="mt-3 w-[250px] bg-transparent border-2 px-2 py-1 rounded-md text-white sm:w-[280px]" placeholder="Kode Pegawai" onChange={handleChange} value={state.kode} name="kode" />
            {/*end kode */}

            {/*button */}
            <button type="submit" className=" btn bg-sky-500 w-[250px] font-poppins font-medium text-white py-2 mt-9 rounded-md sm:w-[280px] capitalize border-0 hover:bg-sky-700">
              SignIn
            </button>
            {/*end button */}

            <div>
              {errorMessage && <p className="text-error mt-2.5 text-center text-sm">{errorMessage}</p>}
            </div>

          </div>
          <img src={illusAdm} className="loginadm-illus w-[450px] hidden sm:flex" />
        </div>
      </form>

      {/*end body */}
    </div>
  );
};

export default LoginAdmin;

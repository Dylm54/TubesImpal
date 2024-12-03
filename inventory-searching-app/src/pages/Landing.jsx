import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import illusLanding from "../assets/illus.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div id="landing-body">
      {/*Body */}

      {/*Header */}
      <div className="landing-company font-poppins text-white font-semibold text-2xl text-center pt-[30px] sm:text-left sm:pl-[30px] sm:text-3xl">
        <h2>Industrial</h2>
      </div>
      {/*End Header */}

      {/*container*/}
      <div className="landing-container flex items-center justify-center mt-[5rem] sm:gap-[13rem] sm:mx-[30px] sm:mt-[3rem]">
        {/*Caption*/}
        <div className="landing-caption w-[270px] text-center sm:w-[379px]">
          <h2 className="text-white font-poppins font-bold text-3xl sm:text-[45px]">Selamat Datang</h2>
          <h3 className="text-white font-poppins font-normal mt-4 sm:text-justify sm:mt-[30px] sm:text-lg">
            Web Penyedia Layanan Ketersediaan Barang Gudang Pabrik, Jelajahi Web Kami dan Dapatkan Aset Bisnis Anda, Kami Siap Memajukan Bisnis Anda Serta Memakmurkan Perekonomian Indonesia.
          </h3>
          {/*Button*/}
          <div className="landing-button flex-col flex sm:flex-row sm:justify-between justify-center gap-7 mt-[5rem] sm:mt-[4rem] ">
            <button className="btn btn-outline text-white font-poppins font-medium border-2 hover:bg-white hover:text-black capitalize sm:px-10 text-sm" onClick={() => navigate("/loginManager")}>
              Manager
            </button>
            <button className="btn btn-outline text-white font-poppins font-medium border-2 hover:bg-white hover:text-black capitalize sm:px-12 text-sm" onClick={() => navigate("/loginAdmin")}>
              Admin
            </button>
          </div>
          {/*end Button*/}
        </div>
        {/*end Caption*/}
        {/*illustrations*/}
        <div className="text-white hidden sm:flex">
          <img src={illusLanding} className="landing-illus w-[500px] min-h-fit" />
        </div>
      </div>
      {/*end container*/}
    </div>
  );
};

export default Landing;

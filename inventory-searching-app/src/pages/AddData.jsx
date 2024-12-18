import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddData.css";
import Nav from "../components/nav";
import axios from "axios";

const AddData = () => {
  const navigate = useNavigate();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const [formData, setFormData] = useState({
    nama: "",
    jumlah: "",
    kategori: "",
    harga: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Konversi 'value' menjadi integer jika 'name' adalah 'harga' atau 'jumlah'
    const newValue = name === "harga" || name === "jumlah" ? parseInt(value, 10) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      kategori: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://beimpal.telkom.cloud/update-product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data berhasil dikirim:", response.data);

      navigate("/adminHome");
    } catch (error) {
      console.error("Error saat mengirim data:", error);
    }
  };

  const handleCancel = () => {
    navigate("/adminHome");
  };

  return (
    <div id="add-body">
      {/*Header */}
      <Nav />
      {/*End Header */}
      <form onSubmit={handleSubmit}>
        <div className="add-container flex justify-center mt-[3rem] sm:mt-[4rem]">
          <div className="add-card bg-black w-[300px] p-5 rounded-xl sm:w-auto sm:p-7">
            <div className="add-card-header justify-between flex items-center">
              <h2 className="text-white font-poppins font-semibold sm:text-2xl">Add Data</h2>
            </div>
            <div className="add-form text-center mt-[1rem] sm:flex sm:items-center sm:gap-[60px] sm:text-left sm:mt-[2rem]">
              {/*left Side */}
              <div className="add-left">
                <h2 className="text-white font-poppins font-medium">Nama Produk</h2>
                <input placeholder="Nama Produk" className="p-1 pl-3 bg-white rounded-md w-[230px] mt-2 text-black" type="text" name="nama" value={formData.nama} onChange={handleChange} />
                {/*space */}
                <h2 className="text-white font-poppins font-medium mt-3 sm:mt-8">Jumlah Produk</h2>
                <input placeholder="Jumlah Produk" className="p-1 pl-3 bg-white rounded-md w-[230px] mt-2 text-black" type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} />
              </div>
              {/*end left Side */}

              {/*right side */}
              <div className="add-right mt-3 sm:mt-0">
                <h2 className="text-white font-poppins font-medium">Kategori</h2>
                <select className="select select-bordered select-sm w-[230px] h-[33px] bg-white mt-2 font-poppins font-normal rounded-md" name="kategori" value={formData.kategori} onChange={handleCategoryChange}>
                  <option disabled value="">
                    Masukan Kategori
                  </option>
                  <option>Makanan</option>
                  <option>Minuman</option>
                  <option>Kesehatan</option>
                  <option>Kecantikan</option>
                  <option>Perabotan</option>
                </select>
                {/*space */}
                <h2 className="text-white font-poppins font-medium mt-3 sm:mt-8">Harga Produk</h2>
                <input placeholder="Harga Produk" className="p-1 pl-3 bg-white rounded-md w-[230px] mt-2 text-black" type="number" name="harga" value={formData.harga} onChange={handleChange} />
              </div>
              {/*end right side */}
            </div>
            <div className="add-button mt-5 justify-center flex sm:mt-8">
              <button className="btn bg-sky-700 text-white px-6 py-2 mr-5 rounded-md font-poppins sm:mr-10 sm:px-8 hover:bg-sky-800 border-0 capitalize" type="submit">
                Save
              </button>
              <button className="btn bg-red-700 text-white px-4 py-2 rounded-md font-poppins sm:px-6 hover:bg-red-800 border-0 capitalize" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddData;

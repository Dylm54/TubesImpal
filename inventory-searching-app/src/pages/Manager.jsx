import Nav from "../components/nav"
import sort from '../assets/sort.png'
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode'

export default function Manager() {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    const [allProduct, setAllProduct] = useState([])
    const [category, setCategory] = useState(null)
    const [search, setSearch] = useState('')
    const isFirstRun = useRef(true);

    useEffect(() => {
        const getAllUrl = "https://industrial-backend.azurewebsites.net/get-product/search"

        const fetchAllData = async () => {
            try {
                const response = await axios.get(getAllUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const data = await response.data.barangModel;
                setAllProduct(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllData()
        if (token) {
            const decode = jwtDecode(token)
        }
    }, [])

    const handleCategory = (e) => {
        const value = e.target.getAttribute("data-value")
        setCategory(value)
    }

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const getFilteredData = async () => {
            try {
                const filterResponse = await axios.get(`https://industrial-backend.azurewebsites.net/get-product/filter?kategori=${category}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const filteredData = await filterResponse.data.barangModel
                setAllProduct(filteredData)
            } catch (err) {
                console.log(err)
            }
        }
        getFilteredData()
    }, [category])

    const handleSearch = () => {
        const getSearchedData = async () => {
            try {
                const searchResponse = await axios.get(`https://industrial-backend.azurewebsites.net/get-product/search?nama=${search}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const searchData = await searchResponse.data.barangModel
                setAllProduct(searchData)
            } catch (err) {
                console.log(err)
            }
        }
        getSearchedData()
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            event.target.value = ''
        }
    };

    return (
        <div className="gradient min-h-screen">
            <Nav />
            <div className="px-8 mt-0 sm:mt-2.5">
                <div className="flex justify-center">
                    <div className="form-control flex-row items-center w-3/4 sm:w-auto">
                        <div className="input-group justify-center">
                            <input
                                type="text"
                                placeholder="Search product…"
                                className="input input-bordered product-card input-sm sm:input-md sm:w-80 w-full sm:text-lg text-sm"
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="btn btn-square btn-sm sm:btn-md search-btn" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 search-img" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>

                    </div>
                    <div className="dropdown ml-2 sm:ml-4 dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <img src={sort} className="h-8 sm:h-10" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow profile-drop rounded-box w-40">
                            <li><a onClick={handleCategory} data-value="Makanan" className="justify-center filters">Makanan</a></li>
                            <li><a onClick={handleCategory} data-value="Minuman" className="justify-center filters">Minuman</a></li>
                            <li><a onClick={handleCategory} data-value="Kesehatan" className="justify-center filters">Kesehatan</a></li>
                            <li><a onClick={handleCategory} data-value="Kecantikan" className="justify-center filters">Kecantikan</a></li>
                            <li><a onClick={handleCategory} data-value="Perabotan" className="justify-center filters">Perabotan</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full flex mt-12 sm:mt-20">
                <div className="flex w-full justify-center">
                    <div className="flex w-4/5 lg:w-3/5 justify-center flex-col shadow-bot">

                        <div className="flex gap-4 sm:gap-5 flex-wrap justify-center h-[450px] overflow-y-scroll">
                            {allProduct.map((e, i) => (
                                <div key={i} className="card w-44 h-24 sm:w-60 sm:h-28 bg-base-100 shadow-xl product-card rounded-[10px]">
                                    <div className="card-body px-4 py-[15px]">
                                        <h2 className="card-title text-xs sm:text-sm pt-0 capitalize">{e.nama}</h2>
                                        <p className="text-xs">Harga : {e.harga}</p>
                                        <div className="flex flex-row">
                                            <p className="text-xs stok">Tersedia : {e.jumlah} barang</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="divide mt-7"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
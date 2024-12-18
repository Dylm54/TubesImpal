import Nav from "../components/nav";
import sort from '../assets/sort.png';
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';

export default function Manager() {
    const [allProduct, setAllProduct] = useState([]);
    const [category, setCategory] = useState(null);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getToken = () => {
        return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    };

    const fetchData = useCallback(async (url) => {
        const token = getToken();
        if (!token) {
            setError('No token found');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data.barangModel;
            setAllProduct(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const baseUrl = "https://beimpal.telkom.cloud/get-product/search";
        fetchData(baseUrl);
    }, [fetchData]);

    const handleCategory = async (e) => {
        const value = e.target.getAttribute("data-value");
        setCategory(value);
        const url = `https://beimpal.telkom.cloud/get-product/filter?kategori=${value}`;
        await fetchData(url);
    };

    const handleSearch = async () => {
        if (!search.trim()) return;
        const url = `https://beimpal.telkom.cloud/get-product/search?nama=${search}`;
        await fetchData(url);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            event.target.value = '';
        }
    };

    if (error) {
        return <div className="text-center mt-8">Error: {error}</div>;
    }

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
                                onChange={(e) => setSearch(e.target.value)}
                                className="input input-bordered product-card input-sm sm:input-md sm:w-80 w-full sm:text-lg text-sm"
                                onKeyDown={handleKeyDown}
                            />
                            <button 
                                className="btn btn-square btn-sm sm:btn-md search-btn" 
                                onClick={handleSearch}
                                disabled={isLoading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 search-img" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="dropdown ml-2 sm:ml-4 dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <img src={sort} className="h-8 sm:h-10" alt="sort" />
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
                        {isLoading ? (
                            <div className="flex justify-center items-center h-[450px]">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : (
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
                        )}
                        <div className="divide mt-7"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
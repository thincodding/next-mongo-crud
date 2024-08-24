"use client";

import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ModalComponents from "../components/ModalComponents";
import AddNewModal from '../components/AddNewModal';
import EditProduct from '../components/EditModal';
import Pagination from "../components/Pagination";
import SelectLimit from "../components/SelectLimit";
import { signOut,useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


async function fetchProduct(page = 1, limit = 10, search = '') {

    
    try {
        const res = await fetch(`http://localhost:3000/api/product?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, { cache: "no-store" });
        if (!res.ok) {
            throw new Error("Error fetching data");
        }
        return res.json();
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return { products: [], totalItems: 0, totalPages: 1 };
    }
}

export default function Product() {
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [title, setTitle] = useState("");
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [fetchProducts, setFetchProducts] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState('');
    const {data: session}  = useSession();
    const router = useRouter();

    useEffect(() => {
        async function getData() {
            const data = await fetchProduct(page, limit, search);
            setProduct(data.products || []);
            setTotalPage(data.totalPages || 1);
            setIsLoading(false);
        }
        getData();
    }, [page, limit, search]);

    const handleDeleteClick = (id: any) => {
        setSelectedProduct(id);
        setIsModalOpen(true);
        setTitle(id);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`http://localhost:3000/api/product?id=${selectedProduct}`, {
                method: "DELETE",
            });
            setProduct(prevProducts => prevProducts.filter((item: any) => item._id !== selectedProduct));
            setIsModalOpen(false);
            setSelectedProduct(null);
            alert("Delete Successful!");

            const data = await fetchProduct(page, limit, search);
            if (data.products.length === 0 && page > 1) {
                setPage(prevPage => prevPage - 1);
            } else {
                setProduct(data.products || []);
                setTotalPage(data.totalPages || 1);
            }
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product. Please try again.");
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleAddModal = () => {
        setAddModal(true);
    };

    const handleClose = () => {
        setAddModal(false);
    };

    const reloadProducts = async () => {
        const data = await fetchProduct(page, limit, search);
        setProduct(data.products || []);
    };

    // Fetch image for editing
    const handleEdit = async (id: any) => {
        try {
            const res = await fetch(`http://localhost:3000/api/product/${id}`);
            const data = await res.json();
            setFetchProducts(data.product);
            setEditModal(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseEdit = () => {
        setEditModal(false);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Select limit
    const handleChangeLimit = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1); 
    };

    // Search
    const handleSearchChange = async (event: any) => {
        setSearch(event.target.value);
        setPage(1);
    };


    const handleSignOut = async () => {
        await signOut();
     //   router.push('/'); // Redirect to login page after sign-out
    };



    return (
        <main className="container mx-auto mt-10">
            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
            <button className="bg-red-500 p-2 text-white" onClick={handleSignOut}>Sign out</button>
            <div className="">
                <button onClick={handleAddModal} className="bg-blue-500 p-3  px-6 hover:bg-blue-600 text-white my-3">
                    Add New
                </button>
                <div className="flex justify-between items-center">
                    <input value={search} onChange={handleSearchChange} type="text" className="w-96 p-3 border-2" placeholder="ស្វែងរក..." />
                    <SelectLimit onChangeLimit={handleChangeLimit} />
                </div>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ProductName</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">CreatedAt</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((item: any) => (
                                <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{item.productName}</td>
                                    <td className="px-6 py-4">{item.qty}</td>
                                    <td className="px-6 py-4">{item.price}</td>
                                    <td className="px-6 py-4">{item.createdAt}</td>
                                    <td className="space-x-2">
                                        <button
                                            className="bg-red-500 p-3  hover:bg-red-600 text-white"
                                            onClick={() => handleDeleteClick(item._id)}
                                        >
                                            លុប
                                        </button>
                                        <button
                                            className="bg-blue-500 p-3  hover:bg-blue-600 text-white"
                                            onClick={() => handleEdit(item._id)}
                                        >
                                            កែប្រែ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4">
                                    មិនមានផលិតផលឈ្មោះ {search} ទេ!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            

            {isModalOpen && (
                <ModalComponents
                    title={title}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}

            {addModal && (
                <AddNewModal
                    onCloseAddModal={handleClose}
                    onProductAdded={reloadProducts}
                />
            )}

            {editModal && (
                <EditProduct
                    products={fetchProducts}
                    reloadProducts={reloadProducts}
                    handleCloseEdit={handleCloseEdit}
                />
            )}

            {products.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            )}

            <Footer />
        </main>
    );
}

"use client";

import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ModalComponents from "../components/ModalComponents";
import AddNewModal from '../components/AddNewModal';
import EditProduct from '../components/EditModal'

async function fetchProduct() {
    try {
        const res = await fetch("http://localhost:3000/api/product", { cache: "no-store" });
        if (!res.ok) {
            throw new Error("Error fetching data");
        }
        return res.json();
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return { product: [] };
    }
}

export default function Product() {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [title, setTitle] = useState("");
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [fetchProducts, setFetchProducts] = useState(null)



    useEffect(() => {
        async function getData() {
            const data = await fetchProduct();
            setProduct(data.product || []);
            setIsLoading(false);
        }
        getData();
    }, []);


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
            alert("Delete Successufll!")
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product. Please try again.");
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    //add New modal

    const handleAddModal = async () => {
        setAddModal(true)
        // alert("Hello")
    }

    const handleClose = () => {
        setAddModal(false)

    }

    //reload product page
    const reloadProducts = async () => {
        const data = await fetchProduct();
        setProduct(data.product || []);
    };


    //Edit Page

    //fetchData Edit
    const handleEdit = async (id: any) => {
       
        try {
            const res = await fetch(`http://localhost:3000/api/product/${id}`)
            const data = await res.json();
            setFetchProducts(data.product);
            setEditModal(true);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCloseEdit = () => {
        setEditModal(false)
    } 




    return (
        <main className="container mx-auto mt-10">
            <button onClick={() => handleAddModal()} className="bg-blue-500 p-3 rounded-md px-6 hover:bg-blue-600 text-white my-3">Add New</button>
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
                        {product.map((item: any) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{item.productName}</td>
                                <td className="px-6 py-4">{item.qty}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">{item.createdAt}</td>
                                <td className="space-x-2">
                                    <button
                                        className="bg-red-500 p-3 rounded-md hover:bg-red-600 text-white"
                                        onClick={() => handleDeleteClick(item._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-blue-500 p-3 rounded-md hover:bg-blue-600 text-white"
                                        onClick={() => handleEdit(item._id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
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

            {/* add modal */}
            {addModal && (
                <AddNewModal
                    onCloseAddModal={handleClose}
                    onProductAdded={reloadProducts} // Pass the reload function
                />
            )}

            {editModal && (
                <EditProduct
                products={fetchProducts}
                reloadProducts={reloadProducts}
                handleCloseEdit={handleCloseEdit}
                
                />
            )}



            <Footer />
        </main>
    );
}

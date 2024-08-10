import React, { useState } from 'react';

type modalEdit = {
    products: any;
    handleCloseEdit: () => void;
    reloadProducts: ()=>void;
};

export default function EditModal({ products, handleCloseEdit,reloadProducts }: modalEdit) {
    const [productName, setProductName] = useState(products.productName);
    const [qty, setQty] = useState(products.qty);
    const [price, setPrice] = useState(products.price);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = {
            newPname: productName,
            newQty: qty,
            newPrice: price
        };

        try {
            const res = await fetch(`http://localhost:3000/api/product/${products._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Cannot update');
            }

            const result = await res.json();
            console.log(result);
            console.log("Data updated");
            handleCloseEdit();
            reloadProducts();
        } catch (err) {
            console.error(err);
            setError('Failed to update the product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full bg-black/20 fixed top-0 z-44 left-0'>
            <div className='flex justify-center items-center h-full'>
                <div className='w-96 h-auto bg-white shadow rounded-sm'>
                    <h1 className='text-3xl text-center mt-5'>កែប្រែបង្កើតផលិតផលថ្មី</h1>
                    <div className='space-x-2 p-3 items-center'>
                        {error && <p className='text-red-500'>{error}</p>}
                        <form onSubmit={handleUpdate} className='space-y-4'>
                            <div>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder='ឈ្មោះផលិតផល'
                                    required
                                    className='border-2 outline-gray-500 rounded-none dark:focus:border-blue-500 p-2 w-full'
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    placeholder='ចំនួន'
                                    required
                                    className='border-2 outline-gray-500 rounded-none dark:focus:border-blue-500 p-2 w-full'
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder='តម្លៃ'
                                    required
                                    className='border-2 outline-gray-500 rounded-none dark:focus:border-blue-500 p-2 w-full'
                                />
                            </div>
                            <div className='flex justify-end space-x-2'>
                                <button
                                    type="button"
                                    onClick={handleCloseEdit}
                                    className='bg-red-600 p-2 text-white hover:bg-red-700 px-5'
                                    disabled={loading}
                                >
                                    បិទ
                                </button>
                                <button
                                    type="submit"
                                    className='bg-blue-600 p-2 text-white hover:bg-blue-700'
                                    disabled={loading}
                                >
                                    {loading ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

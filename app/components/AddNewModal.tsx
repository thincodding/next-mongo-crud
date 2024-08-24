import React, { useState } from 'react'

type addModalProps = {
  onCloseAddModal: () => void;
  onProductAdded: ()=>void;
}


export default function AddNewModal({ onCloseAddModal, onProductAdded }: addModalProps) {

  const [productName, setProductName] = useState("")
  const [qty, setQty] = useState("")
  const [price, setPrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true)

    const data = {
      productName: productName,
      qty: qty,
      price: price
      
    }

    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      const result = await response.json();
      alert("Save success")
      console.log("Success:", result);
      onCloseAddModal();
      onProductAdded();
    } catch (err) {
      console.error("Error:", err);
    }
    finally{
      setIsLoading(false)
    }
  }



  return (
    <div className='w-full h-full bg-black/20 fixed top-0 z-44 left-0'>
      <div className='flex justify-center items-center h-full'>
        <div className='w-96 h-auto bg-white shadow rounded-sm'>
          <h1 className='text-3xl text-center mt-5'>បង្កើតផលិតផលថ្មី</h1>
          <div className='space-x-2 p-3 items-center'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder='ឈ្មោះផលិតផល' required className='border-2 outline-gray-500 rounded-none dark:focus:border-blue-500  p-2 w-full' />
              </div>
              <div>
                <input type="text" value={qty} onChange={(e) => setQty(e.target.value)} placeholder='ចំនួន' required className='border-2 outline-gray-500 rounded-none dark:focus:border-blue-500  p-2 w-full' />
              </div>
              <div>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='តម្លៃ' required className='border-2 outline-gray-500 rounded-none dark:focus:border-blue-500  p-2 w-full' />
              </div>
              <div className='flex justify-end space-x-2'>
                <button onClick={onCloseAddModal} className='bg-red-600 p-2  text-white hover:bg-red-700 px-5'>បិទ</button>
                <button className='bg-blue-600 p-2  text-white hover:bg-blue-700'>{isLoading ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

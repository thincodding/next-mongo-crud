import React, { useEffect } from 'react';

type ModalComponentsProps = {
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title: string;
   
};

export default function ModalComponents({ onClose, onConfirm, title }: ModalComponentsProps) {
    useEffect(() => {
        const handleKeyDown = (event:any) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = (event:any) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='w-full h-full bg-black/50 fixed top-0 z-44 left-0' onClick={handleOverlayClick}>
            <div className='flex justify-center items-center h-full'>
                <div className='w-96 h-40 bg-white shadow rounded-sm'>
                    <h1 className='text-3xl text-center mt-5'>Are you sure delete?</h1>
                    <div className='space-x-2 flex justify-end items-center'>
                        <div className='mt-10 space-x-2 pr-3'>
                            <button
                                onClick={onClose}
                                className='bg-blue-500 p-2 hover:bg-blue-600 ease-in-out rounded-md text-white'
                            >
                                Close
                            </button>
                            <button
                                onClick={onConfirm}
                                className='bg-red-500 p-2 hover:bg-red-600 ease-in-out rounded-md text-white'
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

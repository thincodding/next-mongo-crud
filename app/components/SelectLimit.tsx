import React from 'react';

type PropsLimit = {
    onChangeLimit: (limit: number) => void; 
};

export default function SelectLimit({ onChangeLimit }: PropsLimit) {
    return (
        <div className="mb-4">
            <label htmlFor="limit" className="mr-2">ចំនួនសរុប:</label>
            <select
                onChange={(e) => onChangeLimit(Number(e.target.value))}
                className="py-3 border-2 px-10"
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
}

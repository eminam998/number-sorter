import React from 'react';

const NumberInput = ({ index, value, onChange }) => {
    return (
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(index, e.target.value)}
            className="w-full h-24 text-center border"  // Added styles for uniformity
        />
    );
};

export default NumberInput;

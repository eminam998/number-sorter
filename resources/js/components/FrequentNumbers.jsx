import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FrequentNumbers = () => {
    const [frequentNumbers, setFrequentNumbers] = useState([]);

    useEffect(() => {
        const fetchFrequentNumbers = async () => {
            try {
                const response = await axios.get('/frequent-numbers');
                setFrequentNumbers(response.data);
            } catch (error) {
                console.error('Error fetching frequent numbers:', error);
            }
        };

        fetchFrequentNumbers();
    }, []);

    return (
        <div>
            <h2>Frequent Numbers</h2>
            <div>
                {frequentNumbers.length > 0 ? (
                    frequentNumbers.map((num, index) => (
                        <span key={index} style={{ padding: '5px' }}>
                            {num}
                        </span>
                    ))
                ) : (
                    <p>No frequent numbers available.</p>
                )}
            </div>
        </div>
    );
};

export default FrequentNumbers;

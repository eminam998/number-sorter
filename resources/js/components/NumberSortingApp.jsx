import React, { useState } from 'react';
import axios from 'axios';
import NumberInput from './NumberInput';

const NumberSortingApp = () => {
    const [numbers, setNumbers] = useState(Array(10).fill(''));
    const [sortedNumbers, setSortedNumbers] = useState([]);
    const [originalSortedNumbers, setOriginalSortedNumbers] = useState([]);
    const [error, setError] = useState('');
    const [filterActive, setFilterActive] = useState(false);
    const [filterSymbol, setFilterSymbol] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const handleInputChange = (index, value) => {
        const newNumbers = [...numbers];
        newNumbers[index] = value;
        setNumbers(newNumbers);
    };

    const fillRandomData = () => {
        const randomNumbers = numbers.map(() => Math.floor(Math.random() * 100));
        setNumbers(randomNumbers);
        setSortedNumbers([]);
        setOriginalSortedNumbers([]);
    };

    const isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!numbers.every(num => !isNaN(num) && num !== '')) {
            setError('Please enter valid numbers.');
            return;
        }

        if (filterActive && filterSymbol && filterValue === '') {
            setError('Please enter a value for filtering.');
            return;
        }

        try {
            const response = await axios.post('/sort-numbers', { numbers, filterSymbol, filterValue });
            let result = response.data.sortedNumbers;

            setOriginalSortedNumbers(result);

            if (filterActive) {
                result = result.filter(num => {
                    switch (filterSymbol) {
                        case '<':
                            return num < filterValue;
                        case '>':
                            return num > filterValue;
                        case '=':
                            return num === filterValue;
                        default:
                            return true;
                    }
                });
            }

            setSortedNumbers(result);
            setError('');
        } catch (error) {
            setError('An error occurred while sorting numbers.');
        }
    };

    const toggleFilter = () => {
        setFilterActive(prevState => !prevState);
    };

    const applyFilter = () => {
        if (filterSymbol && filterValue !== '') {
            handleSubmit();
        } else {
            setError('Please enter a valid filter symbol and value.');
        }
    };

    const disableFilter = () => {
        if (originalSortedNumbers.length > 0) {
            setSortedNumbers(originalSortedNumbers);
            setFilterActive(false); // Disable filter UI
            setFilterSymbol('');
            setFilterValue('');
        } else {
            setError('No sorting was done before, cannot disable filter.');
        }
    };

    const renderPlaceholders = () => {
        return Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-[9.5%] h-24 border flex justify-center items-center bg-white"></div>
        ));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen text-center flex flex-col">
            <h1 className="font-bold py-4 text-2xl">Enter or fill fields with random data</h1>
            <div className="flex max-w-full space-x-2">
                {numbers.map((num, index) => (
                    <div key={index} className="w-[9.5%]">
                        <NumberInput
                            index={index}
                            value={num}
                            onChange={handleInputChange}
                            className="w-full h-12"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center space-x-4 py-8">
                <button
                    onClick={fillRandomData}
                    className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
                >
                    Fill Random Data
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>

            <div className="flex items-center justify-start py-4 space-x-4">
                <button
                    onClick={toggleFilter}
                    className={`py-2 px-4 rounded ${filterActive ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                >
                    {filterActive ? 'Disable Filter' : 'Enable Filter'}
                </button>
                {filterActive && (
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Enter symbol ('<', '>', '=')"
                            value={filterSymbol}
                            onChange={e => setFilterSymbol(e.target.value)}
                            className="px-2 py-1"
                        />
                        <input
                            type="number"
                            placeholder="Enter value"
                            value={filterValue}
                            onChange={e => setFilterValue(e.target.value)}
                            className="px-2 py-1"
                        />
                        <button
                            onClick={applyFilter}
                            className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
                        >
                            Apply Filter
                        </button>
                    </div>
                )}
            </div>

            <h1 className="font-bold text-2xl mx-auto">Results</h1>

            <div>
                <div className="flex max-w-full py-8 justify-center items-center space-x-2">
                    {sortedNumbers.length === 0
                        ? renderPlaceholders()
                        : sortedNumbers.map((num, index) => (
                            <span
                                key={index}
                                className="w-[9.5%] h-24 text-center border flex justify-center items-center"
                                style={{
                                    padding: '5px',
                                    backgroundColor: isPrime(num) ? 'green' : 'white',
                                }}
                            >
                                  {num}
                              </span>
                        ))}
                </div>
            </div>

            {error && (
                <div className="absolute bottom-0 w-full bg-red-500 text-white py-2 text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

export default NumberSortingApp;

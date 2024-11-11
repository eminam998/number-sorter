import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css'; // Make sure the path is correct
import NumberSortingApp from './components/NumberSortingApp'; // Import the sorting component
import FrequentNumbers from './components/FrequentNumbers'; // Import the frequent numbers component

const App = () => {
    const [activeTab, setActiveTab] = useState('sortNumbers'); // Default to sorting numbers tab

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Navigation Bar */}
            <nav className="flex justify-center space-x-8 mb-8">
                <button
                    onClick={() => setActiveTab('sortNumbers')}
                    className={`px-4 py-2 font-semibold rounded-md ${activeTab === 'sortNumbers' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-100'}`}
                >
                    Sort Numbers
                </button>
                <button
                    onClick={() => setActiveTab('frequentNumbers')}
                    className={`px-4 py-2 font-semibold rounded-md ${activeTab === 'frequentNumbers' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-100'}`}
                >
                    Frequent Numbers
                </button>
            </nav>

            {/* Display the active component based on the selected tab */}
            {activeTab === 'sortNumbers' && <NumberSortingApp />}
            {activeTab === 'frequentNumbers' && <FrequentNumbers />}
        </div>
    );
};

// Render the app component
const container = document.getElementById('numberApp');
const root = createRoot(container);
root.render(<App />);

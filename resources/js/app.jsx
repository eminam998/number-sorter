import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import NumberSortingApp from './components/NumberSortingApp';
import FrequentNumbers from './components/FrequentNumbers';

const App = () => {
    const [activeTab, setActiveTab] = useState('sortNumbers');

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
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

            {activeTab === 'sortNumbers' && <NumberSortingApp />}
            {activeTab === 'frequentNumbers' && <FrequentNumbers />}
        </div>
    );
};

const container = document.getElementById('numberApp');
const root = createRoot(container);
root.render(<App />);

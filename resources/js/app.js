import './bootstrap';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import SortNumbers from './components/SortNumbers';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<SortNumbers />);

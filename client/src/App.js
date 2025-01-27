import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  // Example state: Replace with your API data

  const [stores, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('/api/data') // URL of your backend endpoint
      .then((response) => {
        setData(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Function to add a new store
  const addStore = () => {
    alert("Redirecting to connect a new store...");
    // Implement your logic to open a form or connect to an API
  };

  // Show a loading message while fetching data
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  
  return (
    <div className="app">
      <h1 className="app-title">Dashboard</h1>
      <div className="dashboard">
        {stores.map((store) => (
          <StoreSquare key={store.id} store={store} />
        ))}
        {/* Add New Store Button */}
        <div className="card connect" onClick={addStore}>
          <div className="card-content">
            <button className="connect-button">+</button>
            <p className="note">Add Store</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreSquare({ store }) {
  return (
    <div className="card">
      {store.isConnected ? (
        <div className="card-content">
          <h2>{store.name}</h2>
          <p>Total Sales: ${store.sales}</p>
          <p>Total Profit: ${store.profit}</p>
        </div>
      ) : (
        <div className="card-content">
          <p>No store connected yet.</p>
        </div>
      )}
    </div>
  );
}


export default App;
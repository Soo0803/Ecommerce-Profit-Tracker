// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   // Example state: Replace with your API data

//   const [stores, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     // Fetch data from the backend API
//     axios
//       .get('/api/data') // URL of your backend endpoint
//       .then((response) => {
//         setData(response.data);
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);

//   // Function to add a new store
//   const addStore = () => {
//     alert("Redirecting to connect a new store...");
//     // Implement your logic to open a form or connect to an API
//   };

//   // Show a loading message while fetching data
//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

  
//   return (
//     <div className="app">
//       <h1 className="app-title">Dashboard</h1>
//       <div className="dashboard">
//         {stores.map((store) => (
//           <StoreSquare key={store.id} store={store} />
//         ))}
//         {/* Add New Store Button */}
//         <div className="card connect" onClick={addStore}>
//           <div className="card-content">
//             <button className="connect-button">+</button>
//             <p className="note">Add Store</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StoreSquare({ store }) {
//   return (
//     <div className="card">
//       {store.isConnected ? (
//         <div className="card-content">
//           <h2>{store.name}</h2>
//           <p>Total Sales: ${store.sales}</p>
//           <p>Total Profit: ${store.profit}</p>
//         </div>
//       ) : (
//         <div className="card-content">
//           <p>No store connected yet.</p>
//         </div>
//       )}
//     </div>
//   );
// }


// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiShoppingBag, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import './App.css';

const App = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then((response) => {
        setStores(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load stores. Please try again later.');
        setLoading(false);
      });
  }, []);

  const addStore = () => {
    // Implement store connection logic
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your stores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">E-Commerce Dashboard</h1>
      </header>
      
      <main className="dashboard-container">
        <div className="dashboard-grid">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
          <div className="add-store-card" onClick={addStore}>
            <FiPlus className="add-icon" />
            <p className="add-store-text">Connect New Store</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const StoreCard = ({ store }) => (
  <div className="store-card">
    <div className="store-card-header">
      <FiShoppingBag className="store-icon" />
      <h2 className="store-name">{store.name}</h2>
      <span className={`status-badge ${store.isConnected ? 'connected' : 'disconnected'}`}>
        {store.isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
    
    {store.isConnected ? (
      <div className="store-metrics">
        <div className="metric-item">
          <FiDollarSign className="metric-icon" />
          <div>
            <p className="metric-label">Total Sales</p>
            <p className="metric-value">${store.sales?.toLocaleString()}</p>
          </div>
        </div>
        <div className="metric-item">
          <FiTrendingUp className="metric-icon" />
          <div>
            <p className="metric-label">Total Profit</p>
            <p className="metric-value">${store.profit?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="store-disconnected">
        <p className="disconnected-text">No store connected</p>
        <button className="connect-button">Connect Store</button>
      </div>
    )}
  </div>
);

export default App;
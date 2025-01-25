import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('/api/data') // URL of your backend endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend and Backend Connection</h1>
      <p>{data ? data.message : 'Loading...'}</p>
    </div>
  );
};

export default App;

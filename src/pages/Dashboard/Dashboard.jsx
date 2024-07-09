import * as React from "react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../api/fetch_api";

export function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProtectedData = async () => {
      try {
        const response = await fetchWithAuth('http://127.0.0.1:8000/api/users/', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        console.log(data)
        setData(data);
      } catch (error) {
        navigate('/login');
        setError(error.message);
        console.error('Error fetching protected data:', error.message);
      }
    };
    getProtectedData();
}, []);

if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {data.data.map(task =>(
            <span key={task.id}>{task.name}</span>
        ))}
    </div>
  )
}
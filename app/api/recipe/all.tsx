// app/providers.tsx
'use client'

import { useState, useEffect} from 'react'

export function fetch_recipe() {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/recipe/all')
        .then(response => response.json())
        .then(json => {
          setData(json);
        })
    }, []);
  
    return data
  }
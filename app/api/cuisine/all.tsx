// app/providers.tsx
'use client'

import { useState, useEffect} from 'react'

export function fetch_cuisine() {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/cuisine/all')
        .then(response => response.json())
        .then(json => {
          setData(json);
        })
    }, []);
  
    return data
  }
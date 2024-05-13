// app/providers.tsx
'use client'

import { useState, useEffect} from 'react'

export function get_shopping_list(id_list: Int32Array) {
    const [data, setData] = useState([]);
    useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get_shopping_list',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipes: id_list
          }),
        }
    )
        .then(response => response.json())
        .then(json => {
          setData(json);
        })
    }, []);
  
    return data
  }
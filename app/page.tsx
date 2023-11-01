// app/providers.tsx
'use client'

import { Card, CardHeader, CardBody, CardFooter, Button } from '@chakra-ui/react'

async function api<T>(url: string) {
  const params = {
    method: 'GET',
    headers: {
        'accept': 'application/json'
    }
};

  var ret = await fetch('http://localhost:8000/api/recipes/all', params)
  .then(response => response.json())
  .then(json => json)
  .catch(e => console.error(e));
  return ret;
}

function BasicCard(props) {
  var json_response = api("http://localhost:8000/api/recipes/all");
  return json_response.then(json => {
    console.log(json);
    return (
      <Card>
      <CardHeader>
        {json[0].dish_name}
      </CardHeader>
      <CardBody>
        {json[0].dish_cuisine}
      </CardBody>
    </Card>
    )
  })
}


export default function App() {
  return (
    <>
    <BasicCard name={"name1"}/>
    </>
  )
}
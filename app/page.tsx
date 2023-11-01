// app/providers.tsx
'use client'

import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Input, Select } from '@chakra-ui/react'
import { useState, useEffect} from 'react'


function CardFromJson(props) {
  return (
    <Card>
    <CardHeader>
      <Heading size='md'>{props.dish_name}</Heading>
    </CardHeader>
    <CardBody>
      <Text>{props.dish_cuisine}</Text>
    </CardBody>
    <CardFooter>
      <Button>{props.dish_id}</Button>
    </CardFooter>
  </Card>
  )
}

function RecipeCardArray() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/recipes/all')
      .then(response => response.json())
      .then(json => {
        setData(json);
        console.log(data);
      })
  }, []);
  return (
    <>
    <SimpleGrid columns = {4} spacing='40px' margin='40px'>
    {data.map(value => <CardFromJson dish_name = {value.dish_name} dish_cuisine = {value.dish_cuisine} dish_id = {value.dish_id} ></CardFromJson>)}
    </SimpleGrid>
    </>
  )
}

function TopHeader() {
  return (
    <div>
      <SimpleGrid columns={2} spacing='40px' margin='40px'>
      <Input placeholder='medium size' size='med' />
      <Select placeholder='Select option'>
      <option value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
      <option value='option3'>Option 3</option>
      </Select>
      </SimpleGrid>
    </div>
  )
}

export default function App() {
  return (
    <>
    <TopHeader></TopHeader>
    <RecipeCardArray></RecipeCardArray>
    </>
  )
}
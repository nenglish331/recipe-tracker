// app/providers.tsx
'use client'

import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Input, Select, TableContainer, Table, Th, Td, Tr, Thead, Tbody } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {Header} from '../../header'

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

function DishDetailPage(props) {
  const [dish, setDish] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dishes/' + props.id)
      .then(response => response.json())
      .then(json => {
        setDish(json);
      })
  }, []);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dishes/' + props.id + '/ingredients')
      .then(response => response.json())
      .then(json => {
        setIngredients(json);
      })
  }, []);
  return (
    <>
    {dish.map(value => <Header text={value.dish_name}></Header>)}
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Ingredient</Th>
            <Th>Measurement</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ingredients.map(ing => (
            <Tr>
              <Td>{ing.ingredient_name}</Td>
              <Td>{ing.quantity_type_text}</Td>
              <Td>{ing.ingredient_quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
  )
}

export default function App( {params} ) {
  return (
    <>
    <DishDetailPage id = {params.id}></DishDetailPage>
    </>
  )
}
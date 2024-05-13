// app/providers.tsx
'use client'

import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Input, Select, TableContainer, Table, Th, Td, Tr, Thead, Tbody } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {Header} from '../../header'
import { get_shopping_list } from '@/app/api/get_shopping_list'


function ShoppingList(props) {
  return (
    <>
    <Header>Shopping List</Header>
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
          {props.shoppingList.map(ing => (
            <Tr>
              <Td>{ing.ingredient_name}</Td>
              <Td>{ing.quantity_type_text}</Td>
              <Td>{ing.total_quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
  )
}

export default function App( {params} ) {
  console.log(params);
  let id_list = params.id_list.split('%2C');
  id_list = id_list.map((item: string) => parseInt(item));
  console.log(id_list);
  let shopping_list = get_shopping_list(id_list);
  console.log(shopping_list);
  return (
    <>
    <ShoppingList shoppingList={shopping_list}></ShoppingList>
    </>
  )
}
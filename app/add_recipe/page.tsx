// app/providers.tsx
'use client'

import { 
  Box,
  Input,
  NumberInput,
  SimpleGrid,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
  Heading,
  Center
} from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {AppMenu} from '../menu'
import {Header} from '../header'

function TopHeader() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cuisines/all')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
  }, []);
  return (
    <Select placeholder="Cuisine">
      <option value="All">{"All"}</option>
      {data.map(cuisine => <option value= {cuisine.dish_cuisine} >{cuisine.dish_cuisine}</option>)}
    </Select>
  )
}


function RecipeIngredient() {
  return (
    <Box>
      <SimpleGrid columns={3} spacing='40px' margin='40px'>
        <Input placeholder="Ingredient Name"></Input>
        <Input placeholder="Quantity Type"></Input>
        <NumberInput>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </SimpleGrid>
    </Box>
  )
}

function IngredientWrapper(props) {
  const [ingredients, setIngredients] = useState<typeof RecipeIngredient[]>([]);
  function addIngredient() {
    const nextIngredients : any[] = ingredients.slice();
    nextIngredients.push(RecipeIngredient());
    setIngredients(nextIngredients);
  }
  return (
    <div>
      {ingredients}
      <Button onClick={addIngredient}>Add Ingredient</Button>
    </div>
  )
}

export default function AddRecipe() {
  return (
    <div>
      <Header text="Add A Recipe"></Header>
      <SimpleGrid columns={2} spacing='40px' margin='40px'>
        <Input placeholder="Recipe Name"></Input>
        <TopHeader></TopHeader>
      </SimpleGrid>
      <IngredientWrapper></IngredientWrapper>
    </div>
  )
}
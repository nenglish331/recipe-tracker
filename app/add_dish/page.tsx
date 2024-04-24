// app/providers.tsx
'use client'

import { 
  Box,
  Input,
  NumberInput,
  SimpleGrid,
  Grid,
  GridItem,
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


function RecipeIngredient(props) {
  return (
    <Box id={props.id}>
      <Grid templateColumns='repeat(10, 1fr)' margin='40px'>
        <GridItem colSpan={1} h='10'>
          <Button onClick={props.remove}>Remove</Button>
        </GridItem>
        <GridItem colStart={2} colEnd={4} h='10'>
          <Input placeholder="Ingredient Name"></Input>
        </GridItem>
        <GridItem colStart={4} colEnd={7} h='10'>
          <Input placeholder="Quantity Type"></Input>
        </GridItem>
        <GridItem colStart={7} colEnd={10} h='10'>
          <NumberInput margin='0'>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </GridItem>
      </Grid>
    </Box>
  )
}

function IngredientWrapper(props) {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [lastId, setId] = useState<number>(0);

  const removeIngredient = id => {
    setIngredients(currentIngredients => currentIngredients.filter(ingredient => ingredient.id !== id));
  };

  const addIngredient = () => {
    const nextId = lastId + 1;
    setId(nextId);
    const newIngredient = {
      id: lastId
    };
    setIngredients(currentChildren => [...currentChildren, newIngredient]);
  };

  return (
    <div>
      {ingredients.map(ingredient=> (
        <RecipeIngredient key={ingredient.id} id={ingredient.id} remove={() => removeIngredient(ingredient.id)} />
      ))}
      <Button onClick={addIngredient}>Add Ingredient</Button>
    </div>
  )
}

export default function AddRecipe() {
  return (
    <div>
      <Header text="Add A Dish"></Header>
      <SimpleGrid columns={2} spacing='40px' margin='40px'>
        <Input placeholder="Recipe Name"></Input>
        <TopHeader></TopHeader>
      </SimpleGrid>
      <IngredientWrapper></IngredientWrapper>
    </div>
  )
}
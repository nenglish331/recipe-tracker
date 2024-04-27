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
import { fetch_ingredients } from '../api/ingredient/all'
import { fetch_quantity_type } from '../api/quantity_type/all'
import { fetch_cuisine } from '../api/cuisine/all'

function CuisineDropinput( {cuisine, handleCuisineChange}) {
  return (
    <>
    <datalist id='cuisines_all'>
      {fetch_cuisine().map(cui => <option value={cui.dish_cuisine}>{cui.dish_cuisine}</option>)}
    </datalist>
    <Input placeholder="Cuisine" list="cuisines_all" name="Cuisine" value={cuisine} onChange={handleCuisineChange}></Input>
    </>
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
          <datalist id='ingredients_all'>
            {fetch_ingredients().map(ing => <option value={ing.ingredient_name}>{ing.ingredient_name}</option>)}
          </datalist>
          <Input placeholder="Ingredient Name" list="ingredients_all" name="Ingredient"></Input>
        </GridItem>
        <GridItem colStart={4} colEnd={7} h='10'>
          <datalist id='quantity_type_all'>
            {fetch_quantity_type().map(qt => <option value={qt.quantity_type_text}>{qt.quantity_type_text}</option>)}
          </datalist>
          <Input placeholder="Quantity Type" list="quantity_type_all" name="Quantity Type"></Input>
        </GridItem>
        <GridItem colStart={7} colEnd={10} h='10'>
          <NumberInput margin='0'>
            <NumberInputField placeholder="Quantity" />
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

function IngredientWrapper({ingredients, setIngredients}) {
  
  const [lastId, setId] = useState<number>(0);

  const removeIngredient = id => {
    setIngredients(currentIngredients => currentIngredients.filter(ingredient => ingredient.id !== id));
  };

  const addIngredient = () => {
    const nextId = lastId + 1;
    setId(nextId);
    const newIngredient = {
      id: lastId,
      ingredient_name: '',
      ingredient_quantity: 0
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
  const [dishName, setDishName] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [resp, setResponse] = useState()
  const handleDishChange = event => {
    setDishName(event.target.value);
  }
  const handleCuisineChange = event => {
    setCuisine(event.target.value);
  }
function send() {
  if (dishName === "") {
    console.log("Empty");
    return
  }
      fetch('http://127.0.0.1:8000/api/create/recipe',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_name: dishName,
        recipe_cuisine: cuisine,
        recipe_ingredients: ingredients
      }),
    }
  )
  }
  return (
    <div>
      <Header text="Add A Dish"></Header>
      <SimpleGrid columns={2} spacing='40px' margin='40px'>
        <Input placeholder="Dish Name" onChange={handleDishChange} value={dishName}></Input>
        <CuisineDropinput cuisine={cuisine} handleCuisineChange={handleCuisineChange}></CuisineDropinput>
      </SimpleGrid>
      <IngredientWrapper ingredients={ingredients} setIngredients={setIngredients}></IngredientWrapper>
      <Button onClick={send}></Button>
    </div>
  )
}
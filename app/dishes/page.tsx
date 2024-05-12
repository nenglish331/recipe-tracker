// app/providers.tsx
'use client'

import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Input, Select, Link } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {AppMenu} from '../menu'
import {Header} from '../header'
import NextLink from 'next/link'
import { fetch_cuisine } from '../api/cuisine/all'
import { fetch_recipe } from '../api/recipe/all'
import test from 'node:test'


function CardFromJson(props) {
  return (
    <Card onClick={props.onRecipeClick} key ={props.dish_id} background={props.selected ? 'darkgrey' : ''}>
    <CardHeader>
      <Heading size='md'>{props.dish_name}</Heading>
    </CardHeader>
    <CardBody>
      <Text>{props.dish_cuisine}</Text>
    </CardBody>
    <CardFooter>
      <Link as={NextLink} key={'viewbutton'} href={'/dishes/' + props.dish_id}><Button>View Dish</Button></Link>
    </CardFooter>
  </Card>
  )
}

function does_dish_match_filters(dish, search_text, cuisine_filter) {
  let upper_dish_text = dish.dish_name.toUpperCase();
  let upper_search_text = search_text.toUpperCase();
  let search_match = false;
  let cuisine_match = false;
  if (upper_search_text.length == 0 || upper_dish_text.includes(upper_search_text)) {
    search_match = true;
  }
  if (dish.dish_cuisine == cuisine_filter || cuisine_filter == "All") {
    cuisine_match = true;
  }
  return (search_match && cuisine_match)
}

function RecipeCardArray(props) {
  return (
    <>
    <SimpleGrid columns = {4} spacing='40px' margin='40px' >
    {/* {props.filteredRecipes.map(value => <Link as={NextLink} key={value.dish_id} href={'/dishes/' + value.dish_id}><CardFromJson dish_name = {value.dish_name} dish_cuisine = {value.dish_cuisine} dish_id = {value.dish_id} selected= {value.selected} onRecipeClick={() => props.toggleSelectOnClick(value.dish_id)}></CardFromJson></Link>)} */}
    {props.filteredRecipes.map(value => <CardFromJson dish_name = {value.dish_name} dish_cuisine = {value.dish_cuisine} dish_id = {value.dish_id} selected= {props.selectedDishes.includes(value.dish_id) ? true:false} onRecipeClick={() => props.clickHandler(value.dish_id)}></CardFromJson>)}
    </SimpleGrid>
    </>
  )
}

function TopHeader({handleCuisineChange, handleRecipeSearchChange}) {
  let cuisines = fetch_cuisine();

  return (
    <div>
      <SimpleGrid columns={2} spacing='40px' margin='40px' >
      <Input placeholder='Dish Name' size='med' onChange={handleRecipeSearchChange} />
      <Select onChange={handleCuisineChange} >
        <option value="All">{"All"}</option>
      {cuisines.map(cuisine => <option key={cuisine.dish_cuisine} value= {cuisine.dish_cuisine} >{cuisine.dish_cuisine}</option>)}
      </Select>
      </SimpleGrid>
    </div>
  )
}


export default function App() {
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchRecipe, setSearchRecipe] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  let recipes = fetch_recipe();
  useEffect(() => {
    recipes.forEach(recipe => recipe.selected=false)
  });
  useEffect(() => {
    let filtered_array: never[]=[];
    for (var i=0; i<recipes.length; i++) {
      if (does_dish_match_filters(recipes[i], searchRecipe, selectedCuisine)) {
        filtered_array.push(recipes[i]);
      }
    }
    setFilteredRecipes([...filtered_array]);
    console.log('In filtering effect');
  }, [recipes, searchRecipe, selectedCuisine]);
  // Generate shopping list
  // Click Handlers
  function toggleSelectOnClick(dish_id) {
    let copied_array = selectedDishes.splice(0)
    if (copied_array.includes(dish_id)) {
      copied_array.splice(copied_array.indexOf(dish_id), 1);
    } else {
      copied_array.push(dish_id);
    }
    console.log(copied_array);
    setSelectedDishes(copied_array);
  }
  function handleCuisineChange(e) {
    setSelectedCuisine(e.target.value);
  }
  function handleRecipeSearchChange(e) {
    setSearchRecipe(e.target.value);
  }
  return (
    <>
    <Header text="Dishes"></Header>
    <TopHeader handleCuisineChange={handleCuisineChange} handleRecipeSearchChange={handleRecipeSearchChange}></TopHeader>
    <RecipeCardArray cuisine={selectedCuisine} search={searchRecipe} filteredRecipes={filteredRecipes} clickHandler={toggleSelectOnClick} selectedDishes={selectedDishes}></RecipeCardArray>
    <Text>{new URLSearchParams({param1:selectedDishes}).toString()}</Text>
    <Link as={NextLink} href={'/shopping_list/' + new URLSearchParams({param1:selectedDishes}).toString()}><Button>Generate Shopping List</Button></Link>
    </>
  )
}
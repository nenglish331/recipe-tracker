// app/providers.tsx
'use client'

import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Input, Select } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {AppMenu} from '../menu'
import {Header} from '../header'


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
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  let initial_load = 0;
  useEffect(() => {
    let filtered_array: never[]=[];
    for (var i=0; i<data.length; i++) {
      if (does_dish_match_filters(data[i], props.search, props.cuisine)) {
        filtered_array.push(data[i]);
      }
      
    }
    setFilteredData([...filtered_array]);
  }, [data, props.cuisine, props.search, initial_load]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/recipes/all')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
  }, []);
  return (
    <>
    <SimpleGrid columns = {4} spacing='40px' margin='40px' >
    {filteredData.map(value => <CardFromJson dish_name = {value.dish_name} dish_cuisine = {value.dish_cuisine} dish_id = {value.dish_id} ></CardFromJson>)}
    </SimpleGrid>
    </>
  )
}

function TopHeader({handleSelectChange, handleSearchChange}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cuisines/all')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
  }, []);

  return (
    <div>
      <SimpleGrid columns={2} spacing='40px' margin='40px' >
      <Input placeholder='Dish Name' size='med' onChange={handleSearchChange} />
      <Select onChange={handleSelectChange} >
        <option value="All">{"All"}</option>
      {data.map(cuisine => <option value= {cuisine.dish_cuisine} >{cuisine.dish_cuisine}</option>)}
      </Select>
      </SimpleGrid>
    </div>
  )
}


export default function App() {
  const [selectedValue, setSelectedValue] = useState("All");
  const [searchText, setSearchText] = useState("");
  function handleSelectChange(e) {
    setSelectedValue(e.target.value);
  }
  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }
  return (
    <>
    <Header text="Recipes"></Header>
    <TopHeader handleSelectChange={handleSelectChange} handleSearchChange={handleSearchChange}></TopHeader>
    <RecipeCardArray cuisine={selectedValue} search={searchText}></RecipeCardArray>
    </>
  )
}
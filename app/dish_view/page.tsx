// app/providers.tsx
'use client'

import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Input, Select } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {AppMenu} from '../menu'
import {Header} from '../header'




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
    <Header text="Dish View"></Header>
    </>
  )
}
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
  Heading,
  Center
} from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {AppMenu} from '../menu'
import {Header} from '../header'


function RecipeIngredient(props) {
  return (
    <Box>
      <SimpleGrid columns={3}>
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

export default function AddRecipe() {
  return (
    <div>
      <Header text="Add A Recipe"></Header>
      <RecipeIngredient></RecipeIngredient>
    </div>
  )
}
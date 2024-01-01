// app/providers.tsx
'use client'

import {
  Box,
  Center,
  Heading
} from '@chakra-ui/react'

import {AppMenu} from './menu'

export function Header(props) {
  return (
    <Box bg="lightslategray" w='100%' padding={2}>
      <AppMenu></AppMenu>
      <Center w="100%">
        <Heading color="white">{props.text}</Heading>
      </Center>
    </Box>
  )
}


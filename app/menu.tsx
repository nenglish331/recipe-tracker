// app/providers.tsx
'use client'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'

// import { HamburgerIcon } from '@chakra-ui/icons'

import Link from 'next/link'

function MenuItemWithLink(props) {
  return (
    <MenuItem>
      <Link href={props.link}>
        {props.text}
      </Link>
    </MenuItem>
  )
}
export function AppMenu() {
  return (
    <Menu>
      <MenuButton as={Button}>
        Navigate
      </MenuButton>
      <MenuList>
        <MenuItemWithLink link="/" text="Home Page"></MenuItemWithLink>
        <MenuItemWithLink link="/dishes" text="Dishes"></MenuItemWithLink>
        <MenuItemWithLink link="/add_dish" text="Add a Dish"></MenuItemWithLink>
        <MenuItemWithLink link="/dishes/id" text="View a Dish"></MenuItemWithLink>
      </MenuList>
    </Menu>
  )
}
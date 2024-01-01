// app/providers.tsx
'use client'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'

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
      <MenuButton as={Button} rightIcon={<HamburgerIcon />}>
        Navigate
      </MenuButton>
      <MenuList>
        <MenuItemWithLink link="/" text="Home Page"></MenuItemWithLink>
        <MenuItemWithLink link="/recipes" text="Recipes"></MenuItemWithLink>
        <MenuItemWithLink link="/add_recipe" text="Add a Recipe"></MenuItemWithLink>
      </MenuList>
    </Menu>
  )
}
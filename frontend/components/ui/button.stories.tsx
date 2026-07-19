import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary Action',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Option',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Border',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Account',
  },
}

export const Loading: Story = {
  args: {
    variant: 'default',
    loading: true,
    children: 'Saving changes',
  },
}

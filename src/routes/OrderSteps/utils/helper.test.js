import {
  filterMeal,
  getRestaurant,
  getDishes,
  validateNumber,
  validateDish,
} from './helper'

const data = [
  {
    id: 1,
    name: 'Chicken Burger',
    restaurant: 'Mc Donalds',
    availableMeals: ['lunch', 'dinner'],
  },
  {
    id: 5,
    name: 'Egg Muffin',
    restaurant: 'Mc Donalds',
    availableMeals: ['breakfast'],
  },
  {
    id: 6,
    name: 'Burrito',
    restaurant: 'Taco Bell',
    availableMeals: ['lunch', 'dinner'],
  },
]

it('test filterMeal', () => {
  expect(filterMeal(data, 'lunch')).toEqual([
    {
      id: 1,
      name: 'Chicken Burger',
      restaurant: 'Mc Donalds',
      availableMeals: ['lunch', 'dinner'],
    },
    {
      id: 6,
      name: 'Burrito',
      restaurant: 'Taco Bell',
      availableMeals: ['lunch', 'dinner'],
    },
  ])
})

it('test getRestaurant', () => {
  expect(getRestaurant(data)).toEqual(['Mc Donalds', 'Taco Bell'])
})

it('test getDishes', () => {
  expect(getDishes(data, 'Mc Donalds')).toEqual([
    {
      id: 1,
      name: 'Chicken Burger',
      restaurant: 'Mc Donalds',
      availableMeals: ['lunch', 'dinner'],
    },
    {
      id: 5,
      name: 'Egg Muffin',
      restaurant: 'Mc Donalds',
      availableMeals: ['breakfast'],
    },
  ])
})

it('test validateNumber', () => {
  expect(validateNumber(-1)).toEqual({
    validateStatus: 'error',
    errorMsg: 'number of people(minimum1 and maximum 10)',
  })
  expect(validateNumber(5)).toEqual({
    validateStatus: 'success',
    errorMsg: null,
  })
  expect(validateNumber(11)).toEqual({
    validateStatus: 'error',
    errorMsg: 'number of people(minimum1 and maximum 10)',
  })
})

it('test validateDish', () => {
  expect(validateDish(4, [1, 2, 3])).toEqual(true)
  expect(validateDish(4, [1, 2, 3, 4, 5])).toEqual(false)
  expect(validateDish(4, [1, 2, 3], 5)).toEqual(false)
})

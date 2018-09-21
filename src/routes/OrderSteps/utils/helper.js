import data from './data.json'

export function getData() {
  return data
}

export function filterMeal(dishes, mealType) {
  return dishes.filter((item) => item.availableMeals.includes(mealType))
}
export function getRestaurant(dishes) {
  return Array.from(new Set(dishes.map((item) => item.restaurant)))
}
export function getDishes(dishes, restaurant) {
  return dishes.filter((item) => item.restaurant === restaurant)
}

export function validateNumber(value) {
  if (value > 0 && value <= 10) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    }
  } else {
    return {
      validateStatus: 'error',
      errorMsg: 'number of people(minimum1 and maximum 10)',
    }
  }
}

export function validateDish(peopleNum, dishesNums, max = 10) {
  let sum = 0
  for (const num of dishesNums) {
    sum += parseInt(num, 10)
  }
  // console.log({ peopleNum, dishesNums })
  return sum >= peopleNum && sum <= max
}

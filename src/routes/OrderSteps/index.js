import React from 'react'
import { Steps, Layout } from 'antd'

import MealForm from './MealForm'
import RestaurantForm from './RestaurantForm'
import DishForm from './DishForm'
import ReviewForm from './ReviewForm'

import { getData, filterMeal, getRestaurant, getDishes } from './utils/helper'

const { Content, Header } = Layout
const { Step } = Steps

const steps = [
  {
    title: 'Select Meal',
  },
  {
    title: 'Select Restaurant',
  },
  {
    title: 'Select dishes',
  },
  {
    title: 'Review',
  },
]
export default class OrderSteps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      meal: 'breakfast',
      peopleNum: 1,

      restaurant: '',

      dishes: getData().dishes,

      dishesByMeal: null,

      dishesByRestaurant: null,

      chosen: [],
    }
  }

  step1Next = ({ meal, peopleNum }) => {
    const { current, dishes } = this.state
    this.setState({
      current: current + 1,
      meal,
      peopleNum,

      dishesByMeal: filterMeal(dishes, meal),
    })
  }

  step2Next = ({ restaurant }) => {
    const { current, dishesByMeal } = this.state

    this.setState({
      current: current + 1,
      restaurant,
      chosen: [],
      dishesByRestaurant: getDishes(dishesByMeal, restaurant),
    })
  }
  step2Prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }
  step3Next = () => {
    const { current } = this.state
    this.setState({
      current: current + 1,
    })
  }
  step3Prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }
  step4Prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }

  render() {
    const {
      current,
      meal,
      peopleNum,
      restaurant,
      dishesByMeal,
      dishesByRestaurant,
      chosen,
    } = this.state

    let form = ''
    switch (current) {
      case 0:
        form = (
          <MealForm meal={meal} peopleNum={peopleNum} next={this.step1Next} />
        )
        break
      case 1:
        form = (
          <RestaurantForm
            restaurant={restaurant}
            restaurants={getRestaurant(dishesByMeal)}
            next={this.step2Next}
            prev={this.step2Prev}
          />
        )
        break
      case 2:
        form = (
          <DishForm
            peopleNum={peopleNum}
            dishes={dishesByRestaurant}
            chosen={chosen}
            prev={this.step3Prev}
            next={this.step3Next}
          />
        )
        break
      default:
        form = (
          <ReviewForm
            meal={meal}
            peopleNum={peopleNum}
            restaurant={restaurant}
            dishes={chosen}
            prev={this.step4Prev}
          />
        )
    }

    return (
      <Layout style={{ height: '100vh' }}>
        <Header>
          <h1 style={{ color: 'white', textAlign: 'center' }}>
            Simple Order System
          </h1>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '50px' }}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div>{form}</div>
        </Content>
      </Layout>
    )
  }
}

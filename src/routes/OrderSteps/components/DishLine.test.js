import React from 'react'
import { shallow } from 'enzyme'

import { Select } from 'antd'
import DishLine, { hasOther } from './DishLine'

const { Option } = Select

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

const chosen = [
  {
    id: 5,
    name: 'Egg Muffin',
    restaurant: 'Mc Donalds',
    availableMeals: ['breakfast'],
  },
]

describe('<DishLine>', () => {
  it('render', () => {
    const wrapper = shallow(
      <DishLine index={1} dishes={data} chosen={[]} update={() => {}} />,
    )

    expect(wrapper.find(Option)).toHaveLength(3)
  })

  it('test change number', () => {
    const updateFn = jest.fn()

    const wrapper = shallow(
      <DishLine index={1} dishes={data} chosen={[]} update={updateFn} />,
    )
    wrapper.find('input').simulate('change', { target: { value: 3 } })

    expect(updateFn.mock.calls.length).toBe(1)
    wrapper.find('input').simulate('change', { target: { value: -1 } })
    expect(updateFn.mock.calls.length).toBe(1)
    wrapper.find('input').simulate('change', { target: { value: 11 } })
    expect(updateFn.mock.calls.length).toBe(1)
    // expect(wrapper.find('input').value).toEqual(3)
  })

  it('test change dish', () => {
    const updateFn = jest.fn()

    const wrapper = shallow(
      <DishLine index={0} dishes={data} chosen={chosen} update={updateFn} />,
    )

    wrapper
      .find(Select)
      .simulate('change', { target: { value: 'Chicken Burger' } })
    expect(updateFn.mock.calls.length).toBe(1)

    // FIXME:
    // wrapper = shallow(
    //   <DishLine index={5} dishes={data} chosen={data} update={updateFn} />,
    // )
    // wrapper.find(Select).simulate('change', { target: { value: 'Egg Muffin' } })
    // expect(wrapper.state().name.validateStatus).toEqual('error')
  })

  it('test have same dish', () => {
    let wrapper = shallow(
      <DishLine index={0} dishes={data} chosen={chosen} name="Egg Muffin" />,
    )
    expect(wrapper.state().name.validateStatus).toEqual('success')

    wrapper = shallow(<DishLine index={0} dishes={data} chosen={[]} />)
  })

  it('test has other', () => {
    expect(hasOther(chosen, 'Egg Muffin', 3)).toBeTruthy()
    expect(hasOther(chosen, 'Egg ', 0)).toBeFalsy()
  })
})

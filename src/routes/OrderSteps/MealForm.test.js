import React from 'react'
import { shallow } from 'enzyme'
import { Select, Button } from 'antd'

import MealForm from './MealForm'

describe('<MealForm />', () => {
  it('render', () => {
    const wrapper = shallow(<MealForm meal="lunch" peopleNum={3} />)
    expect(wrapper.find(Select).children()).toHaveLength(3)
  })

  it('test click next', () => {
    const nextFn = jest.fn()
    const wrapper = shallow(
      <MealForm meal="lunch" peopleNum={3} next={nextFn} />,
    )
    wrapper.find(Button).simulate('click')
    expect(nextFn.mock.calls.length).toBe(1)
  })

  it('test change no. fo people', () => {
    const wrapper = shallow(<MealForm meal="lunch" peopleNum={3} />)
    wrapper.find('input').simulate('change', { target: { value: 3 } })

    expect(wrapper.state().number.value).toBe(3)
  })

  it('test change meal ', () => {
    const wrapper = shallow(<MealForm meal="lunch" peopleNum={3} />)
    wrapper.find(Select).simulate('change', { target: { value: 'dinner' } })

    expect(wrapper.state().meal.target.value).toEqual('dinner')
  })
})

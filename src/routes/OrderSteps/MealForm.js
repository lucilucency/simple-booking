import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Button } from 'antd'

import { validateNumber } from './utils/helper'

const FormItem = Form.Item

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
}

class MealForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meal: props.meal,
      number: {
        value: props.peopleNum,
      },
    }
  }

  handleMealChange = (value) => {
    this.setState({
      meal: value,
    })
  }

  handleNumberChange = (e) => {
    const { value } = e.target

    this.setState({
      number: {
        ...validateNumber(value),
        value,
      },
    })
  }

  next = () => {
    const { meal, number } = this.state
    const num = parseInt(number.value, 10)

    this.props.next({
      meal,
      peopleNum: num,
    })
  }

  render() {
    const { meal, number } = this.state

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} required label="Please Select a meal">
          <Select value={meal} onChange={this.handleMealChange}>
            <Option value="breakfast">breakfast</Option>
            <Option value="lunch">lunch</Option>
            <Option value="dinner">dinner</Option>
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          required
          label="Please Enter Number of people"
          validateStatus={number.validateStatus}
          help={number.errorMsg}
        >
          <input
            type="number"
            style={{ width: '100%' }}
            min={1}
            max={10}
            value={number.value}
            onChange={this.handleNumberChange}
          />
        </FormItem>
        <Button
          type="primary"
          onClick={this.next}
          disabled={number.errorMsg != null}
          style={{ float: 'right' }}
        >
          Next
        </Button>
      </Form>
    )
  }
}

MealForm.propTypes = {
  meal: PropTypes.string.isRequired,
  peopleNum: PropTypes.number.isRequired,
  next: PropTypes.func,
}

MealForm.defaultProps = {
  next: () => {},
}

export default MealForm

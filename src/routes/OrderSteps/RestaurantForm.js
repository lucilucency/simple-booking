import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Button } from 'antd'

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

class RestaurantForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: props.restaurants[0],
    }
  }
  handleRestaurantChange = (value) => {
    this.setState({
      restaurant: value,
    })
  }
  next = () => {
    this.props.next({
      restaurant: this.state.restaurant,
    })
  }

  render() {
    const { restaurant, restaurants } = this.props

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          required
          label="Please Select a Restaurant"
        >
          <Select
            defaultValue={restaurant || restaurants[0]}
            onChange={this.handleRestaurantChange}
          >
            {restaurants.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </FormItem>
        <Button style={{ marginLeft: 8 }} onClick={this.props.prev}>
          Previous
        </Button>
        <Button type="primary" onClick={this.next} style={{ float: 'right' }}>
          Next
        </Button>
      </Form>
    )
  }
}

RestaurantForm.propTypes = {
  restaurant: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
  next: PropTypes.func,
  prev: PropTypes.func,
}

RestaurantForm.defaultProps = {
  next: () => {},
  prev: () => {},
}

export default RestaurantForm

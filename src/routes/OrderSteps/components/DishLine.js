import React from 'react'
import PropTypes from 'prop-types'
import { Select, Form, Row, Col } from 'antd'

const FormItem = Form.Item
const { Option } = Select

export function hasOther(chosen = [], target, index) {
  const indexInChosen = chosen.map((item) => item.name).indexOf(target)
  return indexInChosen !== -1 && indexInChosen !== index
}

export default class DishLine extends React.Component {
  constructor(props) {
    super(props)

    const { chosen, index, name } = props

    const has = hasOther(chosen, name, index)

    this.state = {
      name: {
        validateStatus: has ? 'error' : 'success',
        errorMsg: has ? "can't select the same dish twice" : null,
        value: props.name || '',
      },

      number: {
        value: props.num || 1,
      },
    }
  }

  onChangeDish = (value) => {
    const { chosen, index } = this.props

    if (hasOther(chosen, value, index)) {
      this.setState({
        name: {
          validateStatus: 'error',
          errorMsg: "can't select the same dish twice",
          value,
        },
      })
    } else {
      this.setState({
        name: {
          validateStatus: 'success',
          errorMsg: null,
          value,
        },
      })
      const num = parseInt(this.state.number.value, 10)
      this.props.update({
        index: this.props.index,
        name: value,
        num,
      })
    }
  }

  onChangeNum = (e) => {
    const { value } = e.target

    const num = parseInt(value, 10)

    if (value > 0 && value <= 10) {
      this.setState({
        number: {
          validateStatus: 'success',
          errorMsg: null,
          value: num,
        },
      })
      // FIXME: have a bug
      this.props.update({
        index: this.props.index,
        name: this.props.name,
        num: value,
      })
    } else {
      this.setState({
        number: {
          validateStatus: 'error',
          errorMsg: 'number of dishes(minimum1 and maximum 10)',
          value: num,
        },
      })
    }
  }

  render() {
    const { dishes } = this.props

    const { name, number } = this.state

    return (
      <Form layout="horizontal">
        <Row gutter={16}>
          <Col span={6} />
          <Col span={6}>
            <FormItem validateStatus={name.validateStatus} help={name.errorMsg}>
              <Select value={name.value} onChange={this.onChangeDish}>
                {dishes.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              validateStatus={number.validateStatus}
              help={number.errorMsg}
            >
              <input
                type="number"
                min={1}
                max={10}
                value={number.value || ''}
                onChange={this.onChangeNum}
              />
            </FormItem>
          </Col>
          <Col span={6} />
        </Row>
      </Form>
    )
  }
}

DishLine.proptTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  chosen: PropTypes.array,
  num: PropTypes.number,
  update: PropTypes.func,
}

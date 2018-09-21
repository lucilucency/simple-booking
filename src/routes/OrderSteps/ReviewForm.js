import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Row, Col } from 'antd'

import swal from 'sweetalert'

export default function ReviewForm({
  meal,
  peopleNum,
  restaurant,
  dishes,
  prev,
}) {
  return (
    <div>
      <Card>
        <Row>
          <Col span={12}>
            <h2>Meal</h2>
          </Col>
          <Col span={12}>{meal}</Col>
        </Row>
        <Row>
          <Col span={12}>
            <h2>No. of. People</h2>
          </Col>
          <Col span={12}>{peopleNum}</Col>
        </Row>
        <Row>
          <Col span={12}>
            <h2>Restaurant</h2>
          </Col>
          <Col span={12}>{restaurant}</Col>
        </Row>
        <Row>
          <Col span={12}>
            <h2>Dishes</h2>
          </Col>
          <Col span={12}>
            <Card style={{ backgroundColor: '#f0f2f5' }}>
              {dishes.map((item) => (
                <div key={item.name}>
                  {item.name} - {item.num}
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </Card>
      <Button style={{ marginLeft: 8 }} onClick={prev}>
        Previous
      </Button>
      <Button
        type="primary"
        onClick={() => {
          swal('Success!', 'You can see the order in console !', 'success')
          console.warn(dishes)
        }}
        style={{ float: 'right' }}
      >
        Submit
      </Button>
    </div>
  )
}

ReviewForm.propTypes = {
  meal: PropTypes.string.isRequired,
  peopleNum: PropTypes.number.isRequired,
  restaurant: PropTypes.string.isRequired,
  dishes: PropTypes.array.isRequired,
  prev: PropTypes.func,
}

ReviewForm.defaultProps = {
  prev: () => {},
}

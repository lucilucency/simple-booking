// App 外壳
import React, { Component } from 'react'

import OrderSteps from './routes/OrderSteps'

export default class App extends Component {
  render() {
    return (
      <div>
        <OrderSteps />
      </div>
    )
  }
}

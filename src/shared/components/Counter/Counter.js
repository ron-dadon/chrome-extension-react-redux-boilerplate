import React from 'react'
import { increment } from 'actions/counter'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AddIcon from '@material-ui/icons/Add'

const Counter = ({ count, incrementCounter }) => (
  <Card>
    <CardContent>
      <Badge color="primary" badgeContent={count}>
        <Button variant="contained" onClick={incrementCounter}>
          <AddIcon />
          Increment Counter
        </Button>
      </Badge>
    </CardContent>
  </Card>
)

Counter.propTypes = {
  count: PropTypes.number,
  incrementCounter: PropTypes.func
}

export default connect(state => ({ count: state.counter.count }), { incrementCounter: increment })(Counter)

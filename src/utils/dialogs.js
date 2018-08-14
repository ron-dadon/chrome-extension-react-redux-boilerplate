import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { getMountingPoint, removeMountingPoint } from 'utils/mounting'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import UUID from 'uuid'

export const showDialog = ({ dialogProps, title, content, actions }) => new Promise((resolve, reject) => {
  const dialogId = UUID.v4()

  class DialogWrapper extends PureComponent {
    state = { open: true }

    onExited = () => {
      ReactDOM.unmountComponentAtNode(getMountingPoint(dialogId))
      removeMountingPoint(dialogId)
    }

    render() {
      const wrapPromiseFunction = fn => (value) => {
        this.setState({ open: false })
        fn(value)
      }
      return (
        <Dialog {...dialogProps} open={this.state.open} onExited={this.onExited}>
          <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
          <DialogContent>{content}</DialogContent>
          <DialogActions>{actions({ resolve: wrapPromiseFunction(resolve), reject: wrapPromiseFunction(reject) })}</DialogActions>
        </Dialog>
      )
    }
  }

  ReactDOM.render(<DialogWrapper />, getMountingPoint(dialogId))
})

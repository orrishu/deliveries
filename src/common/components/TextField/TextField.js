import React from 'react'
import FormControl from 'react-bootstrap/lib/FormControl'
import classNames from 'classnames'
import './style.scss'

export default class UITextField extends React.PureComponent {
  render() {
    return (
      <FormControl
        {...this.props}
        styleName={classNames('ui-input', {
          'ui-small': this.props.bsSize === 'small',
        })}
      />
    )
  }
}

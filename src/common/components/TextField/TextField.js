import React from 'react'
import FormControl from 'react-bootstrap/lib/FormControl'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import styles from './style.scss'

@CSSModules(styles)
export default class UITextField extends React.PureComponent {
  render() {
    return (
      <FormControl
        {...this.props}
        styleName={classNames('ui-input', {
          'ui-small': this.props.bsSize === 'small'
        })}
      />
    )
  }
}

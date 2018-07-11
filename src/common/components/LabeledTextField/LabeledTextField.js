import React from 'react'
import TextField from '../TextField/index'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import CSSModules from 'react-css-modules'
import styles from './style.scss'

@CSSModules(styles)
export default class UILabeledTextField extends React.PureComponent {
  render() {
    const { className, id, label, help, feedback, ...rest } = this.props
    return (
      <FormGroup
        controlId={id}
        styleName="ui-labeled-input"
        className={className || ''}
      >
        {label
          ? <ControlLabel styleName="ui-label">
            {label}
          </ControlLabel>
          : null}
        <TextField {...rest} />
        {help &&
          <HelpBlock>
            {help}
          </HelpBlock>}
        {feedback
          ? <FormControl.Feedback>
            {feedback}
          </FormControl.Feedback>
          : null}
      </FormGroup>
    )
  }
}

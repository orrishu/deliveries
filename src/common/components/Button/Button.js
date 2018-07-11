import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import classNames from 'classnames'
import './style.scss'

export default class UIButton extends React.PureComponent {
  render() {
    const { asBlock, className, bsSize } = this.props
    return (
      <Button
        {...this.props}
        className={className}
        styleName={classNames('ui-btn', {
          'ui-xsmall': bsSize === 'xsmall',
          'ui-block': asBlock,
        })}
      />
    )
  }
}

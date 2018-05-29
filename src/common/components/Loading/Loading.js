import React, {Component, PropTypes} from 'react'
import { PulseLoader } from 'react-spinners'
import CSSModules from 'react-css-modules'
import styles from './Loading.scss'


const Loading = ({}) => {

  return <div styleName="loading_continer" className='sweet-loading'>
    <PulseLoader
      color="#3ECD5A"
      loading={true}
    />
  </div>
}

export default CSSModules(Loading, styles)

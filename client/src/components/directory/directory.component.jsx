import React from 'react';
import MenuItem from '../menu-item/menu-item.component'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectDiretorySections} from '../../redux/directory/directory.selector'
 
import './directory.styles.scss'

const Directory = ({sections}) => (

  <div className="directory-menu">
      {/* {this.state.sections.map(({title, imageUrl, id, size, linkUrl}) => (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
      ))} */}
      
      {/* Another way that's less verbose using ES6 destructuring*/}
      {/* {this.state.sections.map(({id, ...otherSectionProps}) => (
          <MenuItem key={id} {...otherSectionProps}/>
      ))} */}

      {/* Refactoring: to include moving state to reducer, from individual directory component, and using "selectors" */}
      {sections.map(({id, ...otherSectionProps}) => (
          <MenuItem key={id} {...otherSectionProps}/>
      ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDiretorySections
})

export default connect(mapStateToProps)(Directory);
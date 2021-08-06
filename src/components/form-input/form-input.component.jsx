import React from 'react';

import "./form-input.styles.scss"

const FormInput = ({handleChange, label, ...otherProps}) => (
  <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {/* We want to dynamically add css class to shrink input label as the user types if the developer passes a "label" */}
      {
          label ?
          <label className={`${otherProps.value.length ? 'shrink': ''} form-input-label`}>
            {label}
          </label>
          : null
      }
  </div>

)

export default FormInput;
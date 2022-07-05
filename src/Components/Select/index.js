import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';
import './style.scss';

const SelectWrapper = ({
    name,
    options,
    ...otherProps
  }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const customStyles = {
      control: (base, state) => {
      
         return ({
        ...base,
        height: 55,
        minHeight: 35,
        border: (meta.touched && field.value === '') && '1px solid red',
       
      })
    }
    };
    const handleChange = newValue => {
    //   const { value } = evt.target;
      setFieldValue(name, newValue);
    };
  
    const configSelect = {
      ...field,
      ...otherProps,
      onChange: handleChange
    };
  
    if (meta && meta.touched && meta.error) {
      configSelect.error = true;
      configSelect.helperText = meta.error;
    }
  
    return (
      <> 
     <Select
     styles={customStyles}
     required
     options={options}
     {...configSelect}
     />
     {
     meta && meta.touched && meta.error&& field.value === ''  ? <div className='error'>Required</div>: null
     }

</>
    );
  };
  
  export default SelectWrapper;
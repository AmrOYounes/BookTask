import React from 'react';
import { useField, useFormikContext } from 'formik';
const InputWrapper = ({
    name,
    ...otherProps
  }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
  
    const handleChange = event => {
        
    //   const { files } = evt.target;
  
      setFieldValue('files', event.currentTarget.files);
   
    };
  
    const configInput = {
      ...field,
      ...otherProps,
      onChange: handleChange
    };
  
    if (meta && meta.touched && meta.error) {
        configInput.error = true;
        configInput.helperText = meta.error;
    }
  
    return (
       <input
       multiple
       {...configInput}
       />
    );
  };
  
  export default InputWrapper;
// FormContext.js

import React from 'react';

const FormContext = React.createContext({
  form: null,
  mode: null,
  fieldProps: null,
});

export default FormContext;

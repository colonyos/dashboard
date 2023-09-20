import React from 'react';

const ErrorModalContext = React.createContext({
    show: false,
    setShow: () => { },
    heading: '',
    message: '',
    setMessage: () => { }
});

export default ErrorModalContext;

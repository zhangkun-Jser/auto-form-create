import React from 'react';
import ReactDom from 'react-dom';
import Router from './router';
import '../assets/index.less';

ReactDom.render(
    <Router/>,
    document.getElementById('app')
);
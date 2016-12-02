import  React from 'react';
import  ReactDom from 'react-dom'
import  { Router, Route } from 'react-router';
import routes from './config/Routes';

ReactDom.render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);

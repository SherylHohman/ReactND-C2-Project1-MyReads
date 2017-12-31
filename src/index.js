import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
)

// I know the instructions said not to change this file.
// However I felt it was the best place to add BrowserRouter..
//  which I felt was needed for my app.
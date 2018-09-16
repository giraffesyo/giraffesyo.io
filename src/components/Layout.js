import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './layout.css'
import { Header } from '../components/Header'

export default ({ children }) => (
  <div>
    <Header />

    {children}
  </div>
)

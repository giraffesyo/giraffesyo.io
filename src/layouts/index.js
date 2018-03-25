import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../components/Header'


export default ({ children }) => (
  <div>
    <Header />
    <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
      {children()}
    </div>
  </div>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import Layout from './components/Layout'
import Messenger from './Messenger'
import Marketplace from './Marketplace'
import Video from './Video'
import Gaming from './Gaming'
import Group from './Group'
import Create from './Create'
import Login from './Login'
import App from './components/App'
import User from './User'
import GroupChat from './GroupChat'

const router = createBrowserRouter([
  {
    path : '/user/:id',
    element : <App><Layout><User/></Layout></App>
  },
  {
    path : '/',
    element : <App><Layout index={1}><Home/></Layout></App>,

  },
  {
    path : '/messenger',
    element : <App><Layout><Messenger/></Layout></App>
  },
  {
    path : '/groupchat',
    element : <App><Layout><GroupChat></GroupChat></Layout></App>
  },
  {
    path : '/marketplace',
    element : <App><Layout index={3}><Marketplace/></Layout></App>
  },
  {
    path : '/video',
    element : <App><Layout index={2}><Video/></Layout></App>
  },
  {
    path : '/group',
    element : <App><Layout index={4}><Group/></Layout></App>
  },
  {
    path : '/gaming',
    element : <App><Layout index={5}><Gaming/></Layout></App>
  },
  {
    path : '/user/login',
    element : <App><Login/></App>
  },
  {
    path : '/user/create',
    element : <App><Create/></App>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)

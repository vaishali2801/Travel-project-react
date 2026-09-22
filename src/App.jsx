import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import MainLayout from "./Routes/Mainlayout";
import Home from "./components/pages/Home";
import Trips from "./components/pages/Trips";

const App = () => {
  const router = createBrowserRouter([{
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"trips",
        element:<Trips/>
      },
    ]
  }])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

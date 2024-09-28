import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { SnackbarProvider } from 'notistack'

function App() {
  const [count, setCount] = useState(0)

  return (
    <SnackbarProvider 
                    maxSnack={3} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    autoHideDuration={3000} // Adjust the duration as needed
                    style={{ zIndex: 1300 }} >
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/blog/:id' element={<Blog />}/>
        <Route path='/blogs' element={<Blogs />}/>
      </Routes>
     </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { CreateBlog } from './pages/CreateBlog';
import { Profile } from './pages/Profile';
import { Signout } from './pages/Signout';
import Cookies from 'js-cookie';
import { BlogsById } from './pages/BlogsById';

function   App() {
  const username = Cookies.get('authorName');
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Blogs />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signout' element={<Signout />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/blog/:blogId' element={<Blog />}/>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/blogs/:authorId' element={<BlogsById />}/>
          <Route path='/create' element={<CreateBlog />}/>
          <Route path={`/profile/:${username}`} element={<Profile />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

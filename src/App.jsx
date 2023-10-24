import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import './App.css'
import Navbar from './component/Navbar'
import Login from './pages/login'
import Signup from './pages/Signup'
import SkillsFeed from './pages/Feed'
import Profile from './pages/Profile'
import Addpost from './pages/Addpost'
import Subscribers from './pages/Subscribers'
function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }


  return (
    <div>

      <Navbar className="Navbar1" />
      <Routes>
       
     

  <Route element={ <NotLoggedIn /> } >

    <Route path='/login' element={ <Login /> } />
    <Route path='/signup' element={ <Signup /> } />

  </Route>

  <Route element={<LoggedIn />}>
    <Route path="/feed" element={<SkillsFeed />} />
    <Route path='/profile' element={ <Profile /> } />
    <Route path='/addpost' element={ <Addpost /> } />
    <Route path='/subscibers' element={ <Subscribers /> } />

  </Route>


</Routes>



    </div>
  )
}

export default App

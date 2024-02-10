import {Routes, Route} from 'react-router-dom'
import Home from '../routes/home'
const RouteController = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default RouteController
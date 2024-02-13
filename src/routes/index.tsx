import {Routes, Route} from 'react-router-dom'
import { FontsDisplay } from '../routes/home'
import SingleFont from '../routes/singleFont'
import { Font } from '../types'
const RouteController = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<FontsDisplay/>}/>
          <Route path='/singlefont' element={<SingleFont onBack={function (): void {
            throw new Error('Function not implemented.')}} font={{} as Font}/>}/>
        </Routes>
    </div>
  )
}

export default RouteController
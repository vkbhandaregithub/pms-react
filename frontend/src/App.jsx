import './App.css'
import ViewProducts from './components/ViewProducts'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import CreateProduct from './components/CreateProduct'
import 'bootstrap/dist/css/bootstrap.min.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css"/>
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ViewProducts/>}/>
          <Route path='/viewproduct' element={<ViewProducts/>}/>
          <Route path='/createproduct' element={<CreateProduct/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

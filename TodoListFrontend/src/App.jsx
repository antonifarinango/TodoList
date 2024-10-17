import './App.css'
import CrearTarea from './views/CrearTarea'
import ListaTareas from './views/ListaTareas'
import { BrowserRouter, Routes , Route }from "react-router-dom"

function App() {

  return (
    <>
      <div className=''>
        <BrowserRouter>
          <Routes>
            <Route  exact path="/" element={<ListaTareas/>}></Route>
            <Route path="/crear-tarea" element={<CrearTarea/>}></Route>
            <Route path="/editar-tarea/:id" element={<ListaTareas/>}></Route>
          </Routes>
        </BrowserRouter>
        
        
      </div>
    </>
  )
}

export default App

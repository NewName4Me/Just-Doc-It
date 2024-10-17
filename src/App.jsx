import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from '@components/hero/';
import Upload from '@components/upload/';
import Result from '@components/result';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </Router>
    </>
  )
}

export default App


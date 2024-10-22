import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from '@components/hero/';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Hero />} />
        </Routes>
      </Router>
    </>
  )
}

export default App


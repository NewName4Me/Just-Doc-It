import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from '@components/hero/';

function App() {
  return (
    <div className="font-bricolage"> {/* Aplica la clase de la fuente aquí */}
      <Router>
        <Routes>
          <Route path='/' element={<Hero />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

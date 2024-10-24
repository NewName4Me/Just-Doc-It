import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from '@components/hero/HeroIndex.jsx';
import Upload from '@components/upload/UploadIndex.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/upload' element={<Upload />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

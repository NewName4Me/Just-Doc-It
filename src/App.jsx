import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from '@components/hero/HeroIndex.jsx';
import Upload from '@components/upload/UploadIndex.jsx';
import Result from '@components/result/ResultIndex.jsx';
import FileContent from '@components/fileContent/FileContent.jsx'; // Asegúrate de que el nombre del archivo sea correcto

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hero />} />  {/* Componente principal de bienvenida */}
        <Route path='/upload' element={<Upload />} />  {/* Componente para subir archivos */}
        <Route path='/result' element={<Result />} />  {/* Componente para mostrar la lista de archivos */}
        <Route path='/result/:id' element={<FileContent />} />  {/* Componente para mostrar el contenido del archivo específico */}
      </Routes>
    </Router>
  );
}

export default App;

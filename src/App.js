import './App.css';
import HomePage from './HomePage';
import Quiz from './Quiz';
import ReadData from './ReadData';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ReadData>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/play_quiz' element={<Quiz/>} />
        </Routes>
      </Router>
      </ReadData>
    </div>
  );
}

export default App;

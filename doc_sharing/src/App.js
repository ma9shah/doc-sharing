import TextEditor from './TextEditor';
import LoginPage from './Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './Dashboard';
import Admin from './Admin';

function App() {
  return (
    <div className="App">
      {/* <TextEditor></TextEditor> */}
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/texteditor' element={<TextEditor/>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <LoginPage></LoginPage> */}
    </div>
  );
}

export default App;

import TextEditor from './TextEditor';
// router
import {
  BrowserRouter as BR,
  Routes,
  Route,
  Redirect
} from 'react-router-dom'

function App() {
  return (
    <BR>
      <Routes>
        <Route path = "/:docId" element = {<TextEditor></TextEditor>} />
      </Routes>
      {/* <div className="App"> */}
        {/* <TextEditor></TextEditor> */}
      {/* </div> */}
    </BR>
  );
}

export default App;

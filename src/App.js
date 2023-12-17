import './App.css';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Story from './components/Story';
import Stories from './components/Stories';
import NewStory from './components/NewStory';

function App() {
  return (
    <div className="app">
      <Toaster position="top-right"/>
      <Router>
      <Header/>
          <Routes>
            <Route
              exact
              path="/"
              element={<Gallery/>}
            />
            <Route exact path="/stories" element={<Stories />} />
            <Route exact path="/new-story" element={<NewStory />} />
            <Route exact path="/story/:uid" element={<Story />} />
          </Routes>
          <Footer/>
        </Router>
     
    </div>
  );
}

export default App;

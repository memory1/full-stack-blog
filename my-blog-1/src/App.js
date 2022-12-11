import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage.js";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar/>
                <div className="App">
                    <h1>My awesome blog</h1>
                    <div id="page-body">
                        <Routes>
                            <Route path='/'
                                element={<HomePage/>}/>
                            <Route path='/about'
                                element={<AboutPage/>}/>
                            <Route path='/articles'
                                element={<ArticlesListPage/>}/>
                            <Route path='/articles/:articleId'
                                element={<ArticlePage/>}/>
                            <Route path='/login'
                                element={<LoginPage/>}/>
                            <Route path='/create-account'
                                element={<CreateAccountPage/>}/>
                            <Route path='*'
                                element={<NotFoundPage/>}/>
                        </Routes>
                        <p>
                            <i>Welcome to my blog!</i>
                        </p>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

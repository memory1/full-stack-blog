import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                <li>
                    <Link to="/login">Log in</Link>
                </li>

                <li>
                    <Link to="/create-account">Create Account</Link>
                </li>
                <li>
                    <Link to="/logout">Log out</Link>
                </li>
            </ul>


        </nav>
    )
}

export default NavBar;

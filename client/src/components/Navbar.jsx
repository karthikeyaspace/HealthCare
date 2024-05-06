
import logo from '../assets/healthcare.svg';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='symptom-checker'>
                    <p>Symptome checker</p>
                </Link>
            </div>
        </nav>
    )
}
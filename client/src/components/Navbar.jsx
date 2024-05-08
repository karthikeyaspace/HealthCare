
import logo from '../assets/healthcare.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="w-full h-12 fixed top-0 bg-blue-200 ">
            <div className='flex flex-row justify-between items-center h-full mx-12'>
                <div>
                    <img src={logo} alt="" />
                </div>
                <div className="">
                    <Link to='healthcare'>
                        <p>Symptome checker</p>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
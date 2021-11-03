import { FunctionComponent } from "react";
import Navbar from "../Navbar";


const Layout: FunctionComponent = ({ children }) => {
    var h = window.innerHeight;
    return (
    <div  className="flex flex-col items-center justify-center min-h-screen" >
        <Navbar />

        {children}

        {/* <footer className="flex items-center justify-center w-full h-24 border-t">
            <a
                className="flex items-center justify-center"
                href="https://github.com/turing-usp/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Build by Turing USP
            </a>
        </footer> */}
    </div>
)}

export default Layout
import { Outlet, Link } from "react-router-dom";
import AuthStatus from "./components/AuthStatus";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
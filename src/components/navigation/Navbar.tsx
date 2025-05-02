import Button from "../ui/Button"

const Navbar = () => {
    return (
        <header className=" text-white shadow-sm py-6 flex justify-between items-center border-b border-b-white/50">
            <div className="flex items-center space-x-8">
                <img src="/LogoFull.svg" alt="NITDA SandBox Logo" className="h-8" />
                <nav className="hidden md:flex space-x-6">
                    <Button variant="noOutline" to="/" className="hover:text-[#06A85D] p-0">Home</Button>
                    <Button variant="noOutline" to="#features" className="hover:text-[#06A85D] p-0">Features</Button>
                    <Button variant="noOutline" to="#howItWorks" className="hover:text-[#06A85D] p-0">How It Works</Button>
                    <Button variant="noOutline" className="hover:text-[#06A85D] p-0">Contact Us</Button>
                </nav>
            </div>
            <div className="space-x-3 flex">
                <Button variant="primaryLight" to="/auth/login">Sign In</Button>
                <Button variant="white"  to="/auth/register">Apply To Sandbox</Button>
            </div>
        </header>
    )
}

export default Navbar
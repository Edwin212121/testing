const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
                <p>Contact: <a href="mailto:your.email@example.com">your.email@example.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;
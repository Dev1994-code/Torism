const AppFooter = () => {
  return (
    <div id="footer">
      <div className="grid grid-cols-2 mx-30">
        <div className="footer">
          <div className="logo">
            <a href="http://google.com">TRVL</a>
          </div>
          <ul className="socials">
            <li>
              <a href="https://www.facebook.com/">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com/">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
          <div className="copyright mt-5 text-xl">Copyright &copy; 2024 </div>
        </div>
        <div className="contact">
          <h3>Contact info</h3>
          <div>
            <p className="text-base mt-5">
              <a>+251 902473275</a>
            </p>
          </div>
          <p className="text-base mt-2">
            <a href="davelovemusic6@gamil.com">visitsidama6@gamil.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AppFooter;

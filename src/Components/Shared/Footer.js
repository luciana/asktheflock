import React from 'react';
function Footer() {
  return(
      <>       
          <footer className="footer text-center">
            <div className="container px-4 px-lg-5">
                <ul className="list-inline mb-5">
                    <li className="list-inline-item">
                        <a className="social-link rounded-circle text-white mr-3" href="https://www.facebook.com/asktheflock"><i className="icon-social-facebook"></i></a>
                    </li>
                    <li className="list-inline-item">
                        <a className="social-link rounded-circle text-white mr-3" href="https://twitter.com/AskTheFlock"><i className="icon-social-twitter"></i></a>
                    </li>
                    <li className="list-inline-item">
                        <a className="social-link rounded-circle text-white" href="https://github.com/luciana/asktheflock"><i className="icon-social-github"></i></a>
                    </li>
                </ul>
                <p className="text-muted small mb-0">Copyright &copy; Ask The Flock @ 2023 All Rights Reserved <a href="/privacy">Privacy Policy</a></p>
            </div>
        </footer>
      </>
  );
}

export default Footer;
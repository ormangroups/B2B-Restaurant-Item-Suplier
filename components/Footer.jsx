const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">Company</h3>
          <p>Zomato Hyperpure Private Limited</p>
          <p>Ground Floor, 12A, 94 Meghdoot, Nehru Place,</p>
          <p>New Delhi - 110019</p>
          <p>CIN: U74900DL2015PTC286208</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">📞</span>
              <p>011-41171717</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">📧</span>
              <p>help@hyperpure.com</p>
            </div>
          </div>
        </div>

        {/* Know More Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Know More</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-500">
                Corporate Announcements
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Supplier Code of Conduct
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Weather Union
              </a>
            </li>
          </ul>
        </div>

        {/* Social and App Links */}
        <div className="text-center md:text-right">
          <h3 className="font-bold text-lg mb-2">Follow us on</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-500">
                Linkedin
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Youtube
              </a>
            </li>
          </ul>
          <div className="flex justify-center md:justify-end mt-6 space-x-4">
            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </a>
            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Apple_App_Store_badge.svg"
                alt="App Store"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-500">
        <p>
          <span className="italic text-sm">fssai License No. 10020064002537</span>
        </p>
        <p className="mt-2">
          Copyright © Hyperpure All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;

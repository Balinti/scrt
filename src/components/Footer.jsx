export default function Footer() {
  return (
    <footer className="bg-footer-bg py-8">
      <div className="max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-body-text">
          &copy; {new Date().getFullYear()} SCRT Labs. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-xs text-body-text">
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Use
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="mailto:info@scrtlabs.com" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/scrtlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/g_result.webp`}
              alt="GitHub"
              className="h-5 w-5"
            />
          </a>
          <a
            href="https://x.com/scrt_labs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/x_result.webp`}
              alt="X"
              className="h-5 w-5"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

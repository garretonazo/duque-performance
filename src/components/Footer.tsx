export default function Footer() {
  return (
    <footer className="w-full max-w-full bg-duque-gray border-t border-[#222] py-10 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        <div className="text-white font-neue-montreal text-base md:text-lg tracking-wide uppercase break-words">
          © {new Date().getFullYear()} Duque Performance
        </div>
        <nav className="flex gap-4 md:gap-6 flex-wrap">
          <a
            href="https://www.instagram.com/duque.performance/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-neue-montreal uppercase text-sm md:text-base hover:text-duque-red transition"
          >
            Instagram
          </a>
         
        </nav>
      </div>
    </footer>
  )
} 
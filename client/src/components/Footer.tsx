function Footer() {
  return (
    <div className="mt-auto bg-blue-600 px-4 py-3 duration-150 dark:bg-slate-800 dark:text-gray-300 ">
      <div className="container mx-auto flex items-center justify-center gap-3 text-xs text-blue-800 sm:text-sm md:text-base dark:text-gray-300">
        <span className="hidden cursor-pointer text-nowrap duration-150 hover:text-blue-900 sm:block">
          Contact Us
        </span>
        <span className="hidden cursor-pointer text-nowrap duration-150 hover:text-blue-900 xs:block">
          Terms & Condtions
        </span>
        <span className="cursor-pointer text-nowrap duration-150 hover:text-blue-900">
          Privacy Policy
        </span>
        <span className="text-nowrap">&copy; 2024 Viktor Abrahamsson</span>
      </div>
    </div>
  );
}

export default Footer;

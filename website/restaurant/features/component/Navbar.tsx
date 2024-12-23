import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className='container flex justify-between bg-red-500'>
      <h1 className='text-4xl font-bold text-center my-5 text-white'>
        Restaurant
      </h1>
      <div className='flex gap-10 justify-center items-center text-xl text-white'>
        <Link
          href='/'
          className='transform hover:scale-125 transition-transform duration-300'
        >
          Home
        </Link>
        <Link
          href='/categories'
          className='transform hover:scale-125 transition-transform duration-300'
        >
          Categories
        </Link>
        <Link
          href='/faq'
          className='transform hover:scale-125 transition-transform duration-300'
        >
          FAQ
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className='container max-w-[330px] flex items-center justify-center gap-16 text-2xl text-white py-2 uppercase bg-gradient-to-br font-bold from-blue-400 to-blue-900 rounded-xl border-2 border-white sticky top-[710px] z-10 shadow-2xl'>
      <Link
        href='/'
        className='hover:underline transition-transform duration-300 transform'
      >
        Profile
      </Link>
      <Link
        href='/menu'
        className='hover:underline transition-transform duration-100 transform'
      >
        Menu
      </Link>
    </nav>
  );
};

export default Navbar;

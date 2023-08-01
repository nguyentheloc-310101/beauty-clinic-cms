import Link from "next/link";

const Logo =
  "https://ucarecdn.com/a7cf14e7-3e76-4ad9-b713-814cf1d021dc/-/quality/smart/-/format/auto/";

const Header = () => {
  return (
    <header className="flex justify-between py-4 items-center bg-white px-10">
      <Link
        href="/"
        className="flex justify-between items-center py-[1rem] px-[20px] "
      >
        <img src={Logo} alt="logo" className="h-[3rem] w-auto" />
      </Link>
      <h1 className="flex-1 text-center">Admin dash board</h1>
    </header>
  );
};

export default Header;

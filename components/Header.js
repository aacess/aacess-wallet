import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-col gap-5 border-b border-gray-350">
      <div className="py-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Image
              width={36}
              height={36}
              src="/favicon.ico"
              className="w-8 md:w-9"
              alt="logo"
            />
            <p className="text-xl font-bold ml-2">AACESS WALLET</p>
          </div>
        </Link>
        <div className="flex w-[30%] justify-between">
          {/* add network selector here */}
        </div>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });

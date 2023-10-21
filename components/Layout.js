import dynamic from "next/dynamic";

const RootLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main>{children}</main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });

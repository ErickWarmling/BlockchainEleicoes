import { Outlet, Link } from "react-router-dom";
import { Github } from "lucide-react";

const BaseLayout = () => {
  return (
    <div className="h-full flex w-full min-h-[100svh] bg-blue-50">
      <aside className="min-h-full w-72 flex flex-col items-center justify-between text-white  bg-blue-900 ">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center mt-4">
            <img src="../../public/logo.png" alt="" className="h-44" />
            <h1 className="text-4xl font-bold mb-12 cursor-default">
              Damocratic
            </h1>
          </div>
          <nav className="flex flex-col h-full  items-center text-xl w-full">
            <Link
              to="/"
              className="hover:bg-blue-800 w-full flex items-center justify-center py-4"
            >
              <p>Home</p>
            </Link>
            <Link
              to="/vote"
              className="hover:bg-blue-800 w-full flex items-center justify-center py-4"
            >
              Vote
            </Link>
            <Link
              to="/candidates"
              className="hover:bg-blue-800 w-full flex items-center justify-center py-4"
            >
              Candidates
            </Link>
            <Link
              to="/about"
              className="hover:bg-blue-800 w-full flex items-center justify-center py-4"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-800 rounded-full w-fit h-fit p-2 mb-4 hover:bg-blue-600">
            <Link to="https://github.com/phllp/vote-chain" target="blank">
              <Github />
            </Link>
          </div>
          <p className=" mb-8 cursor-default">
            &copy; {new Date().getFullYear()} Damocratic
          </p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="p-4 grow max-h-[100svh] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;

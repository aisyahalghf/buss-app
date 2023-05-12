import { Link } from "react-router-dom";

export default function Navbar({ username }) {
  return (
    <div className="flex justify-between px-10 items-center shadow shadow-slate-300 h-[70px] sticky top-0 bg-white ">
      <div>
        <Link to="/">
          <span>WhiteBus</span>
        </Link>
      </div>
      <div>
        {username ? (
          <span>{`halo ${username}`}</span>
        ) : (
          <>
            <Link to="/login">
              <span>
                <button className="bg-white text-black px-3 py-1 rounded-full border border-slate-900 mr-3">
                  Sign in
                </button>
              </span>
            </Link>

            <Link to="/register">
              <span>
                <button className="bg-black text-white px-3 py-1 rounded-full">
                  Join now
                </button>
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

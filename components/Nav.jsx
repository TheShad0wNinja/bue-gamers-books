import Link from "next/link";

export default function Nav() {
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="navbar-start">
        <img
          src="/UNI.png"
          width={150}
          className="bg-white rounded-xl px-3 py-1"
          alt="Uni's Logo"
        />
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          BOOK OVER
        </Link>
      </div>
      <div className="navbar-end">
        <img src="/ClubLogo.png" width={80} alt="Club's Logo" />
      </div>
    </div>
  );
}

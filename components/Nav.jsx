import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="navbar  bg-base-200 px-8 drop-shadow-md">
      <div className="navbar-start">
        <Image src="/UNI.png" width={150} height={80} alt="Uni's Logo" />
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn-ghost btn text-2xl normal-case">
          BOOK OVER
        </Link>
      </div>
      <div className="navbar-end">
        <Image src="/ClubLogo.png" width={80} height={80} alt="Club's Logo" />
      </div>
    </div>
  );
}

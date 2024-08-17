import Link from "next/link";
import Image from "next/image";
import AddPoints from "./AddPoints";
import Register from "./Register";

export default function Drawer({ children, refreshLeaderboard }) {
  return (
    <>
      <div className="drawer-mobile drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar sticky top-0 z-20 h-24 w-full border-b-2 border-b-base-200 bg-base-100 ">
            <div className="navbar-start">
              <div className="flex gap-2">
                <Image
                  src="/ClubLogo1.png"
                  width={80}
                  height={70}
                  alt="Club's Logo"
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/UNI.png"
                  width={150}
                  height={80}
                  alt="Uni's Logo"
                />
              </div>
            </div>
            <div className="navbar-end">
              <label
                for="my-drawer"
                class="btn-ghost drawer-button btn-square btn lg:hidden"
              >
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
                    fill-rule="nonzero"
                  />
                </svg>
              </label>
            </div>
          </div>
          <main>{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <aside className=" w-80 bg-base-200">
            <div className="flex h-24 items-center justify-center">
              <Link href="/" className="btn-ghost btn text-3xl font-bold">
                BOOK OVER
              </Link>
            </div>
            <div className="mb-2 flex flex-col gap-1 px-4">
              <div>
                <span className="text-lg font-medium text-gray-800">
                  Edit Points
                </span>
                <AddPoints refreshLeaderboard={refreshLeaderboard} />
              </div>
              <div className="divider" />
              <div>
                <span className="text-lg font-medium text-gray-800">
                  Register New User
                </span>
                <Register refreshLeaderboard={refreshLeaderboard} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

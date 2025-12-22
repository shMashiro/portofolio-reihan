import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/" className="no-underline">
        <h2 className="text-3xl font-bold text-black">Reihan.</h2>
      </Link>
    </>
  );
};

export default Logo;

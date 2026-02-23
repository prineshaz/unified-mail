import { Avatar, AvatarImage, AvatarFallback } from "../avatar"
import Link from "next/link";
import Image from "next/image";

function Navbar(){
    return (

        <div className="bg-primary bg-slate-100 py-2 px-5 flex justify-between">
            <div className="flex items-center gap-2">
                <Link href="/admin/123">User One</Link>
                <Link href="/admin/456">User Two</Link>
            </div>
            <Image src="/Hostaway_logo.webp" alt="Logo" height={100} width={100}/>

        </div>
    )
}

export default Navbar;
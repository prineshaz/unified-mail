'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ClientRedirect({href}: {href: string}) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== href) {
            router.replace(href);
        }
    }, [href, pathname, router])

    return null;
}
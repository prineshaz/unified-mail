import { Suspense } from "react";
import { getInbox, getMessage } from "@/lib/data";
import InboxPanel from "@/app/admin/_components/InboxPanel";

export default async function InboxPage({params}: {params: {userId:string}}) {
    const { userId } = await params
    const [inboxRes, messageRes] = await Promise.all([getInbox(userId), getMessage()])
    const panelVersion = `${userId}:${inboxRes?.inbox?.length ?? 0}:${messageRes?.messages?.length ?? 0}`;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <InboxPanel
              key={panelVersion} 
              userId={userId} 
              inboxPromise={inboxRes} 
              messagePromise={messageRes} 
            />
        </Suspense>
    )
}
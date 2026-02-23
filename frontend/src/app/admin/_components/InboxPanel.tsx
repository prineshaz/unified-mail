'use client'

import { useState } from "react"
import { reducedData } from "@/lib/utils"
import { useSSE } from "@/lib/hooks"
import InboxList from "@/app/admin/_components/InboxList"

export default function InboxPanel({userId, inboxPromise, messagePromise}: {userId: string, inboxPromise: Record<string, any>, messagePromise: Record<string, any>}) {
    const { inbox } = inboxPromise;
    const { messages } = messagePromise;
    const [data, setData] = useState<Record<string, any>>({inbox, messages})

    // Setup Server Sent Events (SSE) listener to listen for new inbox items.
    const SSE_URL = `${process.env.NEXT_PUBLIC_MESSAGE_SERVICE_API}/api/v1/events?channel=user:${userId}:inbox`
    useSSE({url: SSE_URL, onMessage: (data) => {
        // Upon recieveing new items, update the data with the new inbox items.
        setData((prev) => data.reduce(reducedData, prev))
    }})
    
    const newCount = data.inbox.filter((item: any) => item.status === 'new').length
    const totalCount = data.inbox.length
    return (
        <div>
            <div><span>Inbox: {totalCount}</span> {newCount > 0 && <span>New: {newCount}</span>}</div>
            <InboxList data={data} onSetData={setData} />
        </div>
    )
}
'use client'

import InboxItem from "@/app/admin/_components/InboxItem"

export default function InboxList(props: {data: Record<string, any>, onSetData: (data: Record<string, any>) => void}) {
    const {data, onSetData} = props
    const setInboxStatus = (inboxId: string) => {
        onSetData((prev) => ({
            ...prev,
            inbox: prev.inbox.map((item: any) => inboxId === item.id ? {...item, status: 'viewed'} :  item )
        }))
    }
    return (
        <>

        <ul className="flex w-full flex-col gap-4">
            {data.inbox.map((inbox: any) => {
                const message = data.messages.find((message: any) => message.id === inbox.messageId)
                return (
                    <li key={inbox.id} >
                      <InboxItem props={{inbox, message, setInboxStatus}} />
                    </li>                    
                )
            })}
        </ul>
        </>
    )
}
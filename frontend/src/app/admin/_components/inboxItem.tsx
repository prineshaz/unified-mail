'use client'

import { useParams } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
  } from "@/components/ui/item"
import moment from "moment"
import { TIME_FORMAT } from "@/lib/constants"
import CustomBadge from "@/components/ui/custom/customBadge"
import { updateStatusInboxAction } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { InboxIconAsset } from "@/app/admin/_components/InboxIconAsset"

export default function InboxItem({props}: { props: any}) {
    const { message, inbox, setInboxStatus } = props
    const { userId, messageId } = useParams();
    const status = inbox.status === 'new' ? 'new' : 'viewed'
    const isActive = messageId === String(inbox.messageId)
    const createdAt = moment.utc(message.createdAt).format(TIME_FORMAT)
    return(
        <Item 
            className={cn(
              status === 'new' ? 'new-message' : 'viewed-message',
              isActive && "bg-orange-200 hover:bg-orange-300"
            )} 
            size="sm" 
            variant="outline">
            <ItemMedia variant="icon">
                <InboxIconAsset iconName={message.platform.name} />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{message.subject}</ItemTitle>
                <CustomBadge status={status}>{status}</CustomBadge>
                <ItemDescription>{message.createdAt}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button asChild>
                    <Link onClick={async () => {
                        // Update client state to reflect the updated status.
                        // Optimistically update the status to viewed.
                        setInboxStatus(inbox.id)
                        // Update server state to reflect the updated status.
                        await updateStatusInboxAction(inbox.id)

                    }} 
                    href={`/admin/${userId}/${inbox.messageId}`}>View</Link>
                </Button>
            </ItemActions>
        </Item>
    )
  }
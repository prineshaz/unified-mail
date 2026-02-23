import { Suspense } from "react";
import MessageView from "@/app/admin/_components/MessageView";
import MessagePropertyView from "@/app/admin/_components/MessagePropertyView";
import { getMessage } from "@/lib/data";
import { SkeletonText } from "@/components/ui/custom/SkeletonText";

export default async function MessagePane({ params }: {params: {messageId: string, userId: string }}) {
    const { messageId, userId } = await params
    const messagePromise = getMessage(messageId)
    return (
        <Suspense fallback={<SkeletonText />}>
            { 
              // Simulate a delay to show the loading state
              new Promise(resolve => setTimeout(resolve, 300))
            }
            <MessageView message={messagePromise} userId={userId} />
            <MessagePropertyView message={messagePromise} />
        </Suspense>
    )
}
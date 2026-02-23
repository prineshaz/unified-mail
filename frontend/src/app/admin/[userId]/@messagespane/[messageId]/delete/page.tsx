'use client'

import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useTransition } from "react"
import { deleteMessageByIdAction } from "@/lib/actions"
import { Loader2Icon, Trash2Icon } from "lucide-react"


export default function DeletePage() {
    const { userId, messageId } = useParams<{userId: string, messageId: string}>()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <div>
            <h1>Delete</h1>
            <p>
                Are you sure you want to delete this message?
            </p>
            <div>
                <Button disabled={isPending} variant="destructive" onClick={() => startTransition(async () => {
                    await deleteMessageByIdAction(messageId, userId)
                    router.push(`/admin/${userId}`)
                })}>
                    {isPending ? <Loader2Icon className="animate-spin" /> : <Trash2Icon/>}
                    Delete
                </Button>
            </div>
        </div>
    )
}
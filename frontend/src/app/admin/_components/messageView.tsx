import  { use } from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Trash2Icon } from "lucide-react"
import Link from "next/link"

export default function MessageView({message, userId}: {message: Promise<any>, userId: string}) {    
    const resolved = use(message)

    if (!resolved?.data) {
        return (
            <div>
                <p>No message found</p>
            </div>
        )
    }

    return (
        <div>
            <Card>
                <CardHeader>
                <CardTitle>{resolved.data.subject}</CardTitle>
                <CardAction>
                <Link href={`/admin/${userId}/${resolved.data.id}/delete`}><Trash2Icon /></Link>                
                </CardAction>
            </CardHeader>
            <CardContent>
                <p>{resolved.data.message}</p>
            </CardContent>
            <CardFooter>
                {resolved.data.platform.name}
            </CardFooter>
            </Card>
        </div>
    )

}
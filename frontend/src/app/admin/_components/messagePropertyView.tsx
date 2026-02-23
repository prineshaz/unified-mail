import { Separator } from "@/components/ui/separator"
import { use } from "react"
import moment from "moment"
import { TIME_FORMAT } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { InboxIconAsset } from "@/app/admin/_components/InboxIconAsset"

export default function MessagePropertyView({ message }: { message: Promise<any>}) {
    const resolved = use(message)

    if (!resolved?.data || !resolved?.data?.bookingDetails) {
        return (<><p>No property datails for this message</p></>)
    }

    const {bookingDetails} = resolved.data
    const {propertyDetails} = bookingDetails
    const statusIcon = <InboxIconAsset iconName={bookingDetails.status} />
    
    return (
        <div>
            <div className="flex max-w-sm flex-col gap-4 text-sm">
                <div className="flex flex-col gap-1.5">
                    <div className="leading-none font-semibold">Booking Details</div>
                    <div className="leading-none font-light"><Badge variant="outline">{statusIcon} {bookingDetails.status}</Badge></div> 
                    <div className="leading-none font-light">{moment(bookingDetails.date).format(TIME_FORMAT)}</div>               
                </div>
                <Separator />
                <div className="text-muted-foreground">
                    <p>Type: {propertyDetails.propertyType}</p>
                    <p>{propertyDetails.propertyAddress}</p>
                </div>
            </div>
        </div>
    )
}
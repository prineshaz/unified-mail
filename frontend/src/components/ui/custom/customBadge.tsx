import { Badge } from "@/components/ui/badge"

export default function CustomBadge({status, children}: {status: string, children: React.ReactNode}) {
    return (
        <Badge variant={status === 'new' ? 'default' : 'secondary'}>
            {children}
        </Badge>
    )
}
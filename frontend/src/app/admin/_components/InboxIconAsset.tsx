import { 
    ShieldAlertIcon, 
    MailIcon, 
    ArchiveIcon, 
    CheckIcon,
    InboxIcon,
    ClockIcon,
    AlertCircleIcon,
    CheckCircleIcon,
} from "lucide-react"

const icons: Record<string, React.ElementType> = {
    'foxtons': ShieldAlertIcon,
    'rightmove': CheckIcon,
    'zoopla': MailIcon,
    'expedia': ArchiveIcon,
    'default': InboxIcon,
    'confirmed': CheckIcon,
    'pending': ClockIcon,
    'cancelled': AlertCircleIcon,
    'completed': CheckCircleIcon,
    'failed': AlertCircleIcon,
    'in progress': ClockIcon,
    'in review': AlertCircleIcon,
}

export function InboxIconAsset({iconName}: {iconName: string}): React.ReactNode {
    const cleanName = iconName.toLowerCase().replace(' ', '').trim()
    const Icon = icons[cleanName] || icons['default']
    return <Icon />
}
interface Message {
    id: string,
    subject?: string,
    message: string,
    platform: Platform
    bookingDetails?:BookingDetails,
    messageMetadata: Record<string, any>,
    createdAt: Date | string
    updatedAt?: Date | string | null
}
interface BookingDetails {
    id: string,
    date: Date | string,
    status: string,
    propertyDetails: Record<string, any>,
}
interface Inbox {
    id: string,
    userId: string,
    messageId: string
    status: 'new' | 'viewed' | 'archived'
    createdAt: Date | string
    updatedAt?: Date | string | null
}
interface User {
    id: string,
    email: string,
    name: string,
}
interface Platform {
    id: string,
    name: string,
    logo?: string,
    website?: string,
    description?: string,
}

export type { Message, Inbox, User, Platform };
import { User, Inbox, Message, Platform } from '../types';


const platforms: Platform[] = [
    {
        id: '1',
        name: 'Foxtons',
    },
    {
        id: '2',
        name: 'Rightmove',
    },
    {
        id: '3',
        name: 'Zoopla',
    },
    {
        id: '4',
        name: 'Expedia',
    }
]

export const messages = new Map<string, Message>([
    ['12', {
        id: '12',
        platform: {
            id: '1',
            name: 'Foxtons',
        },
        subject: 'New tenant',
        message: 'New tenant application received, please review the application and get back to the tenant.',
        createdAt: '2026-02-08T00:00:00.000Z',
        updatedAt: null,
        messageMetadata: {
            source: 'email@foxtons.com',
            type: 'Foxtons' 
        },
        bookingDetails: {
            id: '1',
            date: '2026-02-08T00:00:00.000Z',
            status: 'pending',
            propertyDetails: {
                id: '123',
                propertyAddress: '123 Main St, London, UK',
                propertyType: 'Flat',
                propertyDescription: 'Flat with 2 bedrooms and 1 bathroom',
            },
        },
    }],
    ['13', {
        id: '13',
        platform: {
            id: '2',
            name: 'Rightmove',
        },
        subject: 'PAT expiring in 1 week',
        message: 'PAT expiring in 1 week, please renew it before it expires. Also please check the property is in a good condition.',
        createdAt: '2026-02-08T00:00:00.000Z',
        updatedAt: null,
        messageMetadata: {
            source: "email@gmail.com",
            type: "Gmail"
        },
        bookingDetails: {
            id: '1',
            date: '2026-02-08T00:00:00.000Z',
            status: 'confirmed',
            propertyDetails: {
                id: '2',
                propertyAddress: ' 123 Main St, New York, NY',
                propertyType: 'House',
                propertyDescription: 'House with 3 bedrooms and 2 bathrooms',
            },
        },
    }],
    ['14', {
        id: '14',
        platform: {
            id: '2',
            name: 'Rightmove',
        },
        subject: 'Your property has been listed on Rightmove',
        message: 'Your property has been listed on Rightmove, please check the listing and make sure it is accurate.',
        createdAt: '2026-02-08T00:00:00.000Z',
        updatedAt: null,
        messageMetadata: {
            source: "email@outlook.com",
            type: "Outlook"
        },
        bookingDetails: {
            id: '1',
            date: '2026-02-08T00:00:00.000Z',
            status: 'confirmed',
            propertyDetails: {
                id: '3',
                propertyAddress: 'California, USA',
                propertyType: 'Apartment',
                propertyDescription: 'Apartment with 2 bedrooms and 1 bathroom',
            },
        },
    }],
    ['15', {
        id: '15',
        platform: {
            id: '3',
            name: 'Zoopla',
        },
        subject: 'Document uploaded to your property',
        message: 'Document uploaded to your property, please check the document and make sure it is accurate.',
        createdAt: '2026-02-08T00:00:00.000Z',
        updatedAt: null,
        messageMetadata: {
            source: "email@outlook.com",
            type: "Outlook"
        },
        bookingDetails: {
            id: '1',
            date: '2026-02-08T00:00:00.000Z',
            status: 'confirmed',
            propertyDetails: {
                id: '4',
                propertyAddress: 'London, UK',
                propertyType: 'Flat',
                propertyDescription: 'Flat with 2 bedrooms and 1 bathroom',
            },
        },
    }],
    ['16', {
        id: '16',
        platform: {
            id: '4',
            name: 'Expedia',
        },
        subject: 'Your property has been listed on Expedia',
        message: 'Your property has been listed on Expedia, please check the listing and make sure it is accurate.',
        createdAt: '2026-02-08T00:00:00.000Z',
        updatedAt: null,
        messageMetadata: {
            source: "email@outlook.com",
            type: "Outlook"
        },
        bookingDetails: {
            id: '1',
            date: '2026-02-08T00:00:00.000Z',
            status: 'pending',
            propertyDetails: {
                id: '5',
                propertyAddress: 'London, UK',
                propertyType: 'Flat',
                propertyDescription: 'Flat with 2 bedrooms and 1 bathroom',
            },
        },
    }],
    ['17', {
        id: '17',
        platform: {
            id: '4',
            name: 'Zoopla',
        },
        subject: 'Maintenance request for your property',
        message: 'Maintenance request received, by tenant, please check the request and get back to the tenant.',
        createdAt: '2026-02-08T00:00:00.000Z',
        updatedAt: null,
        messageMetadata: {
            source: "email@outlook.com",
            type: "Outlook"
        },
        bookingDetails: {
            id: '1',
            date: '2026-02-08T00:00:00.000Z',
            status: 'pending',
            propertyDetails: {
                id: '6',
                propertyAddress: 'London, UK',
                propertyType: 'House',
                propertyDescription: 'House with 3 bedrooms and 2 bathrooms',
            },
        },
    }],
]);

export const inbox = new Map<string, Inbox>([
    ["1",{
        id: '1',
        userId: '123',
        messageId: '12',
        status: 'viewed',
        createdAt: new Date(),
        updatedAt: null,
    }],
    ["2",{
        id: '2',
        userId: '123',
        messageId: '13',
        status: 'new',
        createdAt: new Date(),
        updatedAt: null,
    }],
    ["3",{
        id: '3',
        userId: '456',
        messageId: '14',
        status: 'new',
        createdAt: new Date(),
        updatedAt: null,
    }],
    ["4",{
        id: '4',
        userId: '456',
        messageId: '15',
        status: 'new',
        createdAt: new Date(),
        updatedAt: null,
    }],
    ["5",{
        id: '5',
        userId: '123',
        messageId: '16',
        status: 'new',
        createdAt: new Date(),
        updatedAt: null,
    }],
    ["6",{
        id: '6',
        userId: '123',
        messageId: '17',
        status: 'new',
        createdAt: new Date(),
        updatedAt: null,
    }],
]);

export const users: User[] = [
    {
        id: '123',
        email: 'test@example.com',
        name: 'Jerome',
    },
    {
        id: '456',
        email: 'test2@example.com',
        name: 'Hayley',
    },
]

// Similate aggregation of messages from different platforms
export const createMessagesModel =  (payload: any[]): string[] | [] => {
    const returnIds: string[] = [];
    payload.forEach((message, idx) => {
        const messageId = Math.floor(100 + Math.random() * 900);
        const randPlat = Math.floor(Math.random() * platforms.length);
        const platform = message.platform?.id ? platforms[message.platform.id - 1] : platforms[randPlat];
        const newMessage = {...message, id: messageId.toString(), createdAt: new Date().toISOString(), platform: platform}
        messages.set(newMessage.id, newMessage);
        returnIds.push(newMessage.id);
    });
    return returnIds;
}

// Similate aggregation of messages into user inbox
export const createInboxModel = (messageIds: string[], userId: string): string[] => {
    const length = inbox.size + 1;
    const newInboxIds: string[] = [];
    messageIds.forEach((messageId, idx) => {
        const newInboxId = (idx + length).toString()        
        inbox.set(newInboxId, {
            id: newInboxId,
            userId: userId,
            messageId: messageId,
            status: 'new',
            createdAt: new Date()
        })
        newInboxIds.push(newInboxId);
    })
    return newInboxIds;
}

export const updateInboxModel = (payload: Inbox[], inboxId: string) => {
    let updatedInboxIds: string[] = [];
    payload.forEach((item) => {
        const existingInbox = inbox.get(inboxId);
        const newInbox = {...existingInbox, ...item, updatedAt: new Date().toISOString(), id: inboxId} as Inbox;
        inbox.set(inboxId, newInbox);
        updatedInboxIds.push(inboxId);
    })
    return updatedInboxIds;
}

export const updateMessagesModel = (payload: Message[]) => {
    payload.forEach(( message: Message) => {
        const existingMessage = messages.get(message.id);
        const updatedPlatform = message.platform?.id ? platforms[Number(message.platform.id) - 1] : platforms[0]
        messages.set(message.id, { ...existingMessage, ...message, platform: updatedPlatform, updatedAt: new Date().toISOString() as string} as Message);
        return message;
    })
}

export const deleteMessageModel = (messageId: string) => {
    const deletedMessage = messages.delete(messageId);
    // Delete message from inbox model
    inbox.forEach(inboxItem => {
        if(inboxItem.messageId === messageId) {
            inbox.delete(inboxItem.id);
        }
    });
    return deletedMessage;
}

export const getUserById = (userId: string) => users.find(user => user.id === userId);
export const getUserMessageById = (messageId: string) => messages.get(messageId);
export const getUserInboxMessage = (userId: string, messageId: string) => [...inbox.values()].find(inbox =>  inbox.userId === userId && inbox.messageId === messageId) ? true : false;
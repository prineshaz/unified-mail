export async function getInbox(userId: string | null = null) {
    const path = `inboxes/${userId}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-user-id': `${userId}`,
        },
    }
    return fetchFromService(path, options);
}

export async function getMessage(messageId: string | null = null) {
    const path = messageId ? `messages/${messageId}` : 'messages';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return fetchFromService(path, options);
}

export async function updateStatusInbox(inboxId:string, userId: string) {
    try {
        if(!inboxId) {
            throw new Error('Inbox ID is required')
        }
        const path = `inboxes/${inboxId}`;
        const body = [{
            status: 'viewed',
        }]
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId,
            },
            body: JSON.stringify(body),
        }
        return fetchFromService(path, options);

    } catch (error) {
        console.error('Error updating status inbox', error)
    }
}

export async function deleteMessage(messageId:string, userId:string) {
    try {
        const path = `messages/${messageId}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId,
            },        
        }
        const response = await fetchFromService(path, options);
        if(!response.ok) {
            throw new Error(`Request ${options.method}, failed status ${response.status} message: ${response.statusText}`)
        } else {
            return response.json();
        }
    } catch (error) {
        console.error('Error deleting message', error)
    }
}

async function fetchFromService(path: string, options: Record<string, any>) {
    try {
        const response = await fetch(
            `${process.env.MESSAGE_SERVICE_API}/api/v1/${path}`,
            options
        )

        if(!response.ok) {
            throw new Error(`Request ${options.method}, failed status ${response.status} inbox: ${response.statusText}`)
        }
        
        return response.json();

    } catch (error) {
        console.error('Error fetching from service', error)
    }
}
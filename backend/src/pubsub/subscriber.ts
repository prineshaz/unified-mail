import { redisSubscriber } from '../config/redis';
import { createMessagesModel, createInboxModel, inbox as inboxes, messages } from '../model';
import { broadcastToChannel } from './sse';
import { Inbox, Message} from '../types';

export const subToChannel = async (channel: string): Promise<void> => {
    redisSubscriber.subscribe(channel,  (message: string) => {
        console.log('Message received from Redis:', message);
        try {
            const userId = channel.split(':')[1];
            const inboundMessage = JSON.parse(message);
            const messageIds = createMessagesModel(inboundMessage);
            const newInboxIds = createInboxModel(messageIds, userId);
            console.log('Message IDs to be assiged to user inbox:', userId, messageIds);
            const ssePayload: any[] = [];
            newInboxIds.forEach((inboxId) => {
                const inbox = inboxes.get(inboxId) as Inbox;
                const message = messages.get(inbox.messageId) as Message;
                ssePayload.push({inbox, message})
            })
            // Subscribe here, then push to SSE listeners.
            // Only push inbox items to SSE listeners.
            broadcastToChannel(`${channel}:inbox`, ssePayload)
            
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
}
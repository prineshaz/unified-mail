import { NextFunction, Request, Response } from 'express';
import { inbox, createInboxModel, getUserById, getUserInboxMessage, updateInboxModel } from '../model';
import { ValidationError, ConflictError, NotFoundError } from '../exception';
import { Inbox } from '../types';

export const getInboxes = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const userId = req.params.userId as string;
    const responseJson = {
        message: 'Inbox fetched successfully',
        inbox: Array.from(inbox.values()),
    }
    
    if (userId){
        responseJson.inbox = Array.from(inbox.values()).filter((inbox) => inbox.userId === userId)
    }
 
    return res.status(200).json(responseJson);
}

export const createInbox = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.headers['x-user-id'] as string;
    const payload = req.body as Inbox[]
    if (!getUserById(userId)) {
        throw new ValidationError('Valid user ID is required', { userId });
    }

    const messageIds = payload.map(item => item.messageId);

    if(messageIds.some(messageId => getUserInboxMessage(userId, messageId))) {
        throw new ConflictError('You have already added one or more messages to your inbox, remove them first', { userId: userId, messageIds: messageIds });
    }
    
    const newInboxIds = createInboxModel(messageIds, userId);
    return res.status(201).json({
        message: 'Inbox created successfully',
        data: { ids: newInboxIds },
    });
}

export const patchInboxStatus = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.headers['x-user-id'] as string;
    const { inboxId } = req.params as { inboxId: string };
    const payload = req.body as Inbox[];
    if (!getUserById(userId)) {
        throw new ValidationError('Valid user ID is required', { userId });
    }
    const inboxItem = inbox.get(inboxId);
    if (!inboxItem) {
        throw new NotFoundError('Item not found', { id: inboxId });
    }
    const updatedInboxIds = updateInboxModel(payload, inboxId);

    return res.status(200).json({
        message: 'Inbox status updated successfully',
        data: { ids: updatedInboxIds },
    });
}

export const deleteInboxes = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.headers['x-user-id'] as string;
    const inboxId = req.params.inboxId as string;
    if (!getUserById(userId)) {
        throw new ValidationError('Valid user ID is required', { userId });
    }
    const inboxItem = inbox.get(inboxId);
    if (!inboxItem) {
        throw new NotFoundError('Item not found', { id: inboxId });
    }
    const response = inbox.delete(inboxId);
    if (!response) {
        throw new NotFoundError('Attempted to delete inbox, but item could not be deleted', { inboxId });
    }
    return res.status(200).json({
        message: 'Inbox deleted successfully',
        data: { id: [inboxId] },
    });
}
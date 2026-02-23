import { NextFunction, Request, Response } from 'express';
import { messages, createMessagesModel, createInboxModel, getUserById, getUserInboxMessage, updateMessagesModel, deleteMessageModel} from '../model';
import { NotFoundError, ValidationError, ServerError, ForbiddenError } from '../exception';
import { Message } from '../types';

export const getMessages = async (_req: Request, res: Response, next: NextFunction): Promise<Response> => {
    return res.status(200).json({
        message: 'Messages fetched successfully',
        messages: Array.from(messages.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    });
}

export const getMessageById = async (req: Request, res: Response): Promise<Response> => {
    const { messageId } = req.params  as {messageId: string}   
    
    const message = messages.get(messageId);

    if (!message) {
        throw new NotFoundError('Item not found', { messageId });
    }

    return res.status(200).json({
        message: 'Message fetched successfully',
        data: message,
    })
}

export const createMessage = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.headers['x-user-id'] as string;
    let messageIds: string[] = [];
    
    if (!getUserById(userId)) {
        throw new ValidationError('Valid user ID is required', { userId });
    }
    try {
        messageIds = createMessagesModel(req.body);
        createInboxModel(messageIds, userId);
    } catch(error) {
        throw new ServerError('Error creating messages', { error });
    }
    return res.status(201).json({
        message: 'Message created successfully',
        data: { messageIds },
    })
}

export const updateMessage = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.headers['x-user-id'] as string;
    const body = req.body as Message[];

    if(!getUserById(userId)) {
        throw new ValidationError('Valid user ID is required', { userId });
    }

    const allValid = body.every(message => getUserInboxMessage(userId, message.id))

    if(!allValid) {
        throw new ForbiddenError('Forbidden: You are not allowed access to one or more messages', { userId: userId, messageIds: body.map(message => message.id) });
    }

    updateMessagesModel(body);
    
    return res.status(200).json({
        message: 'Message status updated successfully',
    })
}

export const deleteMessage = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.headers['x-user-id'] as string;
    const { messageId } = req.params as { messageId: string };

    if(!getUserById(userId)) {
        throw new ValidationError('Valid user ID is required', { userId });
    }
    const message = messages.get(messageId);

    if (!message) {
        throw new NotFoundError('Item not found', { messageId });
    }
    // Delete message from messages and inbox models
    const response = deleteMessageModel(messageId);

    if(!response) {
        throw new NotFoundError('Attempted to delete message, but item could not be deleted', { messageId });
    }
    return res.status(200).json({
        message: 'Message deleted successfully',
    })
}

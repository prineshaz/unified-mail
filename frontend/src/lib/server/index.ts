import { getInbox } from "../data";

export async function resolveDefaultMessageId(userId: string) {
    const inboxRes = await getInbox(userId);
    const firstMessageId = inboxRes?.inbox?.[0]?.messageId;
    return firstMessageId || null;
}
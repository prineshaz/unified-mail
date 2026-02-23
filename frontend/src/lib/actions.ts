'use server'

import { refresh } from 'next/cache'
import { updateStatusInbox, deleteMessage } from './data'
import { redirect } from 'next/navigation'

export async function updateStatusInboxAction(id:string) {
    const response = await updateStatusInbox(id, '123')
    refresh()
    return response
}

export async function deleteMessageAction(formData: FormData) {
    const messageId = formData.get('messageId') as string
    const userId = formData.get('userId') as string
    await deleteMessage(messageId, userId)
    refresh()
    redirect(`/admin/${userId}`)
}

export async function deleteMessageByIdAction(messageId: string, userId: string) {
    await deleteMessage(messageId, userId)
    redirect(`/admin/${userId}`)
}
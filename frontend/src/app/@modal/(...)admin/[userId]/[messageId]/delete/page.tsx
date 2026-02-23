
import Modal from "@/components/ui/custom/Modal"
import { deleteMessageAction } from "@/lib/actions"

export default async function ModalPage({ params }: {params: {userId: string, messageId: string}}) {
    const { userId, messageId } = await params
    return (
        <Modal
            title="Delete Message"
            confirmLabel="Delete"
            confirmFormId="delete-message-form"
            cancelTo={`/admin/${userId}/${messageId}`}
            >
            <form id="delete-message-form" action={deleteMessageAction}>
                <input type="hidden" name="messageId" value={messageId} />
                <input type="hidden" name="userId" value={userId} />
                <p>Are you sure you want to delete this message?</p>
            </form>
        </Modal>
    )
}
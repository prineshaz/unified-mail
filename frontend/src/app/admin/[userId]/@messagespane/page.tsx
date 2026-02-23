'use server';
import { resolveDefaultMessageId } from "@/lib/server";
import ClientRedirect from "@/components/helper/ClientRedirect";

export default async function MessagePane({ params }: { params: { userId: string } }) {
    const { userId } = await params;
    const firstMessageId = await resolveDefaultMessageId(userId);
    if (!firstMessageId) {
        return <div>No message to display</div>;
    }
    // Redirect to the first message in the inbox
    return (
        <>
            <ClientRedirect href={`/admin/${userId}/${firstMessageId}`} />
        </>
    )
}
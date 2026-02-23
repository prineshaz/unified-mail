export default async function UserPage({params}: {params: {userId:string}}) {
    const { userId } = await params

    return (
        <>
          <h2 className="scroll-m-24 text-2xl font-semibold pt-3">Your messages User ({userId})</h2>
        </>
    )
}
import Link from 'next/link'

export default async function UnifiedLayout(
    {children, inbox, messagespane}: 
    {children: React.ReactNode, inbox: React.ReactNode, messagespane: React.ReactNode}) {
    return (
        <>
        <div>{children}</div>
        <div className="grid grid-cols-6 gap-4 min-h-screen pt-4">
            <aside className="col-span-2 sticky top-0 h-screen overflow-y-auto">
              {inbox}
            </aside>
            <main className="col-span-4 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] gap-4 pt-6">                        
              {messagespane}             
            </main>
        </div>
        </>
    )
}
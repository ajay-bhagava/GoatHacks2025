import Link from "next/link";

export default async function page({ params }) {
    const {id} = await params
    return <html>
        <body className="h-screen">
            <nav className="px-[15%] w-full shadow-lg h-[8%] flex items-center">
                <span><Link href="/">Home</Link></span>
            </nav>
            <ItemListing id={id} />
        </body>
    </html>
}

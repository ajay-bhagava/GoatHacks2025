import Link from "next/link";
import { ItemListing } from "./ItemListing";

export default async function page({ params }: any) {
    const {id} = await params
    return <html>
        <body className="h-screen">
            <nav className="px-[15%] w-full shadow-lg flex items-center">
                <span><Link href="/">Home</Link></span>
            </nav>
            <ItemListing id={id} />
        </body>
    </html>
}

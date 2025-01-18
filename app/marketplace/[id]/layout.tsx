import Link from "next/link";

export default function layout({ children }: any) {
    return <>
        <nav className="w-3/4 p-6 mx-auto">
            <div className="float-left">
                <span>
                    <Link href="/">Home</Link>
                </span>
            </div>
            <div className="float-right">
                <span>
                    <Link href="/">Home on the right</Link>
                </span>
            </div>
        </nav>
        {children}
    </>
}

import {SignUpForm} from "./SignUpForm"
import Link from "next/link"

export default function Page() {
	return <>
		<nav className="flex align-center flex-row p-4 gap-3 shadow">
            <Link href="/"><img src="/techtrade.png" className="w-9 h-9" /></Link>
            <Link href="/" className="btn btn-sm btn-ghost">Home</Link>
            <Link href="/marketplace" className="btn btn-sm btn-ghost">Marketplace</Link>
        </nav>
		<SignUpForm />
		</> 

}

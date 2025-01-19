'use client'

import { createUser, loginUser } from "@/lib/pocketbase";
import { useEffect, useRef, useState } from "react";
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation";
import Link from "next/link"

export function SignUpForm() {
    const [err, setErr] = useState(false);
    const form = useRef<HTMLFormElement>(null)
    const router = useRouter()
    if (pb.authStore.isValid) {
        router.push("/marketplace")
    }


	const handleSubmit = (e: any) => {
		e.preventDefault();
		const { email, password } = Object.fromEntries(new FormData(e.currentTarget))

		createUser(password, password, email)
		.then(_ => router.replace("/marketplace"), _ => setErr(true))
	}

    useEffect(() => {
        form.current?.addEventListener("submit", handleSubmit)
    })


    return <div className="w-1/3 mx-auto card shadow-xl p-6 mt-6">
        <h1 className="mx-auto text-3xl font-bold">Sign Up!</h1>
        <form className="flex flex-col gap-4" ref={form}>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">
                        Email
                    </span>
                </div>
                <input type="email" className="input input-bordered" name="email" placeholder="Email" required />
            </label>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">
                        Password
                    </span>
                </div>
                <input type="password" className="input input-bordered" name="password" placeholder="Password" required />
            </label>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">
                        WPI ID (For Verification)
                    </span>
                </div>
                <input type="password" className="input input-bordered" name="idnum" placeholder="WPI ID #" required />
            </label>
                <button name="login" type="submit" className="btn btn-primary flex-1">Sign Up!</button>
				<Link href='/login' className="link self-center">Already have an account? Log In!</Link>
            {err && <span className="text-error">Error Creating User</span>}
        </form>
    </div>

}

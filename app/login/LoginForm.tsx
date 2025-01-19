'use client'

import { createUser, loginUser } from "@/lib/pocketbase";
import { useEffect, useRef, useState } from "react";
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation";
import Link from "next/link"

export function LoginForm() {
    const [err, setErr] = useState(false);
    const form = useRef<HTMLFormElement>(null)
    const router = useRouter()
    if (pb.authStore.isValid) {
        router.push("/marketplace")
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(e.currentTarget))

        loginUser(email, password)
            .then(_ => router.replace("/marketplace"), _ => setErr(true))
    }

    useEffect(() => {
        form.current?.addEventListener("submit", handleSubmit)
    })


    return <div className="w-1/3 mx-auto card shadow-xl p-6 mt-6">
        <h1 className="mx-auto text-3xl font-bold">Log In!</h1>
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
            <button name="login" type="submit" className="btn btn-primary flex-1">Log In</button>
            <Link href="/signup" className="link self-center">Don't have an account? Sign up!</Link>
            {err && <span className="text-error">Error Logging In</span>}
        </form>
    </div>

}

'use client'

import { createUser, loginUser } from "@/lib/pocketbase";
import { useEffect, useRef, useState } from "react";
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation";

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
        switch (e.submitter.name) {
            case "signup":
                console.log("signup")
                createUser(password, password, email)
                    .then(_ => location.href = "/marketplace", _ => setErr(true))
                break;
            case "login":
                loginUser(email, password)
                    .then(_ => location.href = "/marketplace", _ => setErr(true))
                console.log("login")
                break;
        }
    }

    useEffect(() => {
        form.current?.addEventListener("submit", handleSubmit)
    })


    return <div className="w-1/3 mx-auto card shadow-xl p-6 mt-6">
        <h1 className="mx-auto text-3xl font-bold">Log In or Sign Up</h1>
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
            <div className="w-full flex gap-2">
                <button name="signup" type="submit" className="btn btn-neutral btn-outline flex-1">Sign Up</button>
                <button name="login" type="submit" className="btn btn-primary flex-1">Log In</button>
            </div>
            {err && <span className="text-error">Error Creating User</span>}
        </form>
    </div>

}

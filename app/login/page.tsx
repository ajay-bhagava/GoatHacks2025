"use client";
import { FormEvent, useState } from "react";
import { createUser } from '@/lib/pocketbase.js'

export default function page() {
    const [err, setErr] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement

        const { email, password, passwordConfirm } = Object.fromEntries(new FormData(form))
        try {
            await createUser(password, passwordConfirm, email)
            location.href = "/"
        } catch {
            setErr(true)
        }
    }

    return <div className="w-1/2 mx-auto">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">
                        Email
                    </span>
                </div>
                <input type="email" className="input input-bordered" name="email" placeholder="Email" />
            </label>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">
                        Password
                    </span>
                </div>
                <input type="password" className="input input-bordered" name="password" placeholder="Password" />
            </label>
            <label className="form-control ">
                <div className="label">
                    <span className="label-text">
                        Confirm Password
                    </span>
                </div>
                <input type="password" className="input input-bordered" name="passwordConfirm" placeholder="Confirm Password" />
            </label>
            <button className="btn btn-primary">Log In!</button>
            {err && <span className="text-error">Error Creating User</span>}
        </form>
    </div>

}

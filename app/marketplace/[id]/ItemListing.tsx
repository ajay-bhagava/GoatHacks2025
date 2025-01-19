'use client'

import pb, { getPosts } from "@/lib/pocketbase.js"

export async function ItemListing({id}: any) {
    let post: any;
    try {
        post = await getPosts()
    } catch {
        post = "failed to get post"
    }

    return <>

    </>
} 

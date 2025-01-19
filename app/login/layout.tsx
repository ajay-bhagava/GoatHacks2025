import pb from "@/lib/pocketbase"

export default function layout({ children }: any) {


    return <div className="h-screen">
        <nav className="flex align-center flex-row p-4">
            <a href="/" className="link">Home</a>
        </nav>
        {children}
    </div>
}

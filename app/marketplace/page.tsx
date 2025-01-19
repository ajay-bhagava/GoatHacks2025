import Content from "@/app/marketplace/Content";
import NavBar from "@/components/navbar";

export default function page() {
    return (
        <>
            <div className={"overflow-x-hidden"}>
                <NavBar />
                <Content />
            </div>

        </>
    );
}
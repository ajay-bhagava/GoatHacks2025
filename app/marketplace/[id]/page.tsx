

export default async function page({ params }: any) {
    const id = (await params).id
    return <div>Buy some {id}</div>
}


const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Please wait...</h1>
            <p className="text-lg text-gray-700 mb-6">Fetching user roles and access.</p>
        </div>
    )
}

export default Loading

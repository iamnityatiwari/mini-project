

const Logo = ({logoName})=>{
    return(
        <>
            <div className="text-2xl font-bold text-blue-600 flex-shrink-0 animate-pulse">
                <img className="size-12 rounded-full md:" src={logoName} alt="my-logo" />
            </div>
        </>
    )
}

export default Logo;
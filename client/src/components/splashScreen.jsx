export default function SplashScreen() {
    return ( 
        <div className="flex flex-col w-full h-full m-auto items-center justify-center">
            <img width={200} className="m-5" src="/logo.png"></img>
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    )
}
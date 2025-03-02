import HomePageSales from "../components/homePageSales";
import {Link , useNavigation} from "react-router-dom"
import HomePageLast6 from "../components/last6Carousel";
import AnimatedLayout from "../animation/animatedLayout";
export default function HomePage() {
  const navigation = useNavigation()
    return (
      <AnimatedLayout>
        {' '}
        {navigation.state === 'loading' ? (
          <div className="flex justify-center w-full">
            <span className="loading loading-infinity loading-lg m-auto"></span>
          </div>
        ) : (
          <>
            <div
              className="hero min-h-1/2"
              style={{
                backgroundImage:
                  'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
                  <p className="mb-5">
                    Explore all of our product catalogue and filter or sort as
                    you discover the most amazing website!
                  </p>
                  <Link
                    to={'/product/type?name=product'}
                    className="btn btn-primary"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <HomePageSales />

            <HomePageLast6 />
          </>
        )}{' '}
      </AnimatedLayout>
    )
}
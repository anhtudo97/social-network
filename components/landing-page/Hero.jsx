import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => (
  <div className="bg-gray-50">
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 w-full h-full" aria-hidden="true">
        <div className="relative h-full">
          <svg
            className="absolute transform right-full translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
            />
          </svg>
          <svg
            className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
            />
          </svg>
        </div>
      </div>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-6 pb-16 sm:pb-24"
      >
        <div className="px-4 mx-auto mt-16 max-w-7xl sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Dribbble, but for</span>
              <span className="block text-pink-600">web developers</span>
            </h1>
            <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover creative websites and developers across the globe. A
              portal for you to share your projects and get inspired for free.
            </p>
            <div className="flex flex-wrap justify-center mt-12 gap-x-4 gap-y-2">
              <Link href="/signup">
                <a className="inline-block px-8 py-3 text-base font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 md:py-3 md:text-lg md:px-6">
                  Join Community
                </a>
              </Link>
              <Link href="/home">
                <a className="inline-block px-8 py-3 text-base font-medium text-pink-600 bg-pink-100 border border-transparent rounded-md hover:bg-pink-200 md:py-3 md:text-lg md:px-6">
                  Discover Posts
                </a>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="relative">
        <div className="absolute inset-0 flex flex-col" aria-hidden="true">
          <div className="flex-1" />
          <div className="flex-1 w-full bg-pink-600" />
        </div>
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="px-4 mx-auto max-w-7xl sm:px-6"
        >
          <Image
            className="relative rounded-lg shadow-lg"
            src="https://imgur.com/pZJQ5kT.png"
            width={1920}
            height={1080}
          />
        </motion.div>
      </div>
    </div>
    <div className="bg-pink-600 pb" />
  </div>
);

export default Hero;

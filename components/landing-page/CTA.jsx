import Link from "next/link";

const CTA = () => (
  <div className="bg-pink-500">
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Ready to dive in?</span>
        <span className="block text-pink-600">Join ATD3www today.</span>
      </h2>
      <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
        <div className="inline-flex rounded-md shadow">
          <Link href="/signup">
            <a className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700">
              Get started
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default CTA;

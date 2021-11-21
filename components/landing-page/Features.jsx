import {
  ChatIcon,
  GlobeAltIcon,
  EmojiHappyIcon,
  HeartIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Discover websites and developers",
    description:
      "Browse through an awesome collection of websites built by developers across the globe and promote your projects as well.",
    icon: GlobeAltIcon,
  },
  {
    name: "Like, comment and follow",
    description:
      "Follow your favourite developers, like a post, leave a nice comment and build your own personal feed curated to your interests.",
    icon: HeartIcon,
  },
  {
    name: "Chat and engage with the community",
    description:
      "Reach out to others with real-time chat integrated in the platform and get notified about interactions with your post.",
    icon: ChatIcon,
  },
  {
    name: "Free and open-source, forever",
    description:
      "Driwwwle will remain free forever with no advertisement, data collection, tracking or anything of that sorts!",
    icon: EmojiHappyIcon,
  },
];

const Features = () => (
  <div className="py-12 bg-white">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base font-semibold tracking-wide text-pink-600 uppercase">
          Features
        </h2>
        <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Why Join the Community?
        </p>
        <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
          Register to enter the world of creative design and development.
        </p>
      </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-pink-500 rounded-md">
                  <feature.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

export default Features;
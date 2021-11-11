import { Hero } from "../components/landing-page/Hero";
import { Features } from "../components/landing-page/Features";
import { CTA } from "../components/landing-page/CTA";

const LandingPage = () => (
  <>
    <Hero />
    <Features />
    <CTA />
  </>
);

export function getServerSideProps() {
  return {
    props: { title: "ATD3www - The Social Network for Developers" },
  };
}

export default LandingPage;

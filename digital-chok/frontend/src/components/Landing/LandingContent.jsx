
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle,
  BriefcaseBusiness,
  Star,
  Phone,
  UserPlus,
  Handshake,
  Wrench,
  Home,
  GraduationCap,
  HeartPulse,
  ChevronDown,
} from "lucide-react";

const LandingContent = () => {
  const features = [
    {
      icon: MapPin,
      title: "Location Based Services",
      description:
        "Discover service providers who work in your locality and can reach your location.",
    },
    {
      icon: ShieldCheck,
      title: "Detailed Profiles",
      description:
        "View professional details, experience, service information and customer feedback.",
    },
    {
      icon: Clock,
      title: "Availability Information",
      description:
        "Check whether a service provider is currently available before contacting them.",
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description:
        "Make better decisions by exploring ratings and feedback from other customers.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Search a Service",
      description:
        "Choose the service you need and explore professionals working in your area.",
    },
    {
      number: "02",
      icon: Users,
      title: "Explore Professionals",
      description:
        "Compare profiles, service prices, location, availability and ratings.",
    },
    {
      number: "03",
      icon: Phone,
      title: "Contact the Provider",
      description:
        "Connect directly with the professional and discuss your requirements.",
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Get Your Work Done",
      description:
        "Arrange the service at your convenience and get your work completed.",
    },
  ];

  const benefits = [
    "Find local professionals in one place",
    "Explore service details and pricing",
    "Check provider location and availability",
    "Connect directly with service providers",
    "Discover skilled workers in your community",
  ];

  const faqs = [
    {
      question: "What is Digital Chok?",
      answer:
        "Digital Chok is a local service marketplace that helps customers discover and connect with service providers in their area.",
    },
    {
      question: "How can I find a service provider?",
      answer:
        "You can explore services, select your location and browse professionals who provide services in your area.",
    },
    {
      question: "Can I register as a service provider?",
      answer:
        "Yes. Skilled professionals can create their profiles, add service details and connect with potential customers.",
    },
    {
      question: "Can I check the price before contacting a provider?",
      answer:
        "Service providers can display their pricing information on their profiles so customers can understand the expected cost.",
    },
  ];

  return (
    <main className="bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="bg-blue-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28 lg:px-8">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-600">
              <MapPin size={16} />
              Your Local Service Marketplace
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Find Local Services.
              <span className="block text-blue-600">
                Connect with Professionals.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Digital Chok makes it easier to discover skilled
              professionals around you. Explore service profiles,
              compare information and connect with the right person
              for your everyday needs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/provider/register"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Join as Provider
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle size={17} className="text-blue-600" />
              Discover services. Connect locally.
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <div className="rounded-3xl bg-blue-100 p-6 md:p-10">
              <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Welcome to
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      Digital Chok
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <MapPin size={24} />
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3 text-gray-500">
                    <Search size={20} className="text-blue-600" />
                    <span>What service do you need?</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <BriefcaseBusiness size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Local Professionals
                      </p>
                      <p className="text-sm text-gray-500">
                        Skilled people near your area
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Clear Information
                      </p>
                      <p className="text-sm text-gray-500">
                        Profiles, prices and reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Handshake size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Easy Connection
                      </p>
                      <p className="text-sm text-gray-500">
                        Connect with service providers
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="scroll-mt-24 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              About Digital Chok
            </p>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Connecting Communities Through Local Services
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Finding a reliable professional for everyday work
              can sometimes be difficult. Digital Chok brings
              local service providers and customers together
              through a simple digital platform.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you need help with home maintenance,
              education, repairs or other everyday services,
              Digital Chok helps you explore available
              professionals and connect with them conveniently.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-7">
              <Users size={30} className="text-blue-600" />

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                For Customers
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Discover professionals, explore their services
                and connect with the right person for your work.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-7">
              <BriefcaseBusiness size={30} className="text-blue-600" />

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                For Professionals
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Create a digital profile, showcase your skills
                and make your services easier to discover.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-7">
              <Handshake size={30} className="text-blue-600" />

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                For Communities
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Support local talent and make useful services
                more accessible to people in your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-gray-50 py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Simple Process
            </p>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              How Digital Chok Works
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              A simple way to discover local services
              and connect with professionals.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-blue-100">
                      {step.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="scroll-mt-24 py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="grid items-center gap-12 md:grid-cols-2">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Our Features
              </p>

              <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Everything You Need to Find the Right Professional
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Digital Chok is designed to make service discovery
                simple by bringing useful provider information
                together in one place.
              </p>

              <ul className="mt-7 space-y-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      size={20}
                      className="mt-1 shrink-0 text-blue-600"
                    />
                    <span className="text-gray-700">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/services"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
              >
                Discover Services
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="rounded-2xl bg-blue-50 p-8 md:p-12">
              <div className="rounded-xl bg-white p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <MapPin size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Local Discovery
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Find services in your area
                    </p>
                  </div>
                </div>

                <div className="my-6 border-t border-gray-100" />

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        Provider Information
                      </span>
                      <span className="text-blue-600">
                        Available
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-blue-100">
                      <div className="h-2 w-full rounded-full bg-blue-600" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        Service Details
                      </span>
                      <span className="text-blue-600">
                        Easy to Explore
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-blue-100">
                      <div className="h-2 w-4/5 rounded-full bg-blue-600" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        Customer Connection
                      </span>
                      <span className="text-blue-600">
                        Convenient
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-blue-100">
                      <div className="h-2 w-5/6 rounded-full bg-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROVIDER SECTION */}
      <section className="bg-blue-600 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2 lg:px-8">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              Grow With Digital Chok
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Are You a Skilled Service Provider?
            </h2>

            <p className="mt-6 leading-8 text-blue-100">
              Your skills deserve to be discovered.
              Create your profile on Digital Chok and
              introduce your services to people in your area.
            </p>

            <Link
              to="/provider/register"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Register as Provider
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-2xl bg-blue-700 p-8 md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-blue-600">
                <UserPlus size={28} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Create Your Profile
                </h3>
                <p className="mt-1 text-sm text-blue-100">
                  Start your digital journey
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4 text-blue-50">
              <p className="flex items-center gap-3">
                <CheckCircle size={18} />
                Showcase your skills
              </p>

              <p className="flex items-center gap-3">
                <CheckCircle size={18} />
                Add your service information
              </p>

              <p className="flex items-center gap-3">
                <CheckCircle size={18} />
                Set your location and pricing
              </p>

              <p className="flex items-center gap-3">
                <CheckCircle size={18} />
                Connect with potential customers
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        id="faq"
        className="scroll-mt-24 py-20 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-5">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Frequently Asked Questions
            </p>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Have Questions?
            </h2>

            <p className="mt-5 text-gray-600">
              Here are some answers to help you get started.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-gray-200 p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
                  {faq.question}

                  <ChevronDown
                    size={20}
                    className="shrink-0 text-blue-600 transition group-open:rotate-180"
                  />
                </summary>

                <p className="mt-4 leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-100 bg-blue-50 px-6 py-14 text-center md:px-12">

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Your Local Services Start Here
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Explore Digital Chok and discover a simpler way
            to connect with local professionals.
          </p>

          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-blue-200">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <Link
                to="/"
                className="text-2xl font-bold text-gray-900"
              >
                Digital <span className="text-blue-600">Chok</span>
              </Link>

              <p className="mt-4 max-w-xs text-sm leading-7 text-gray-600">
                Connecting customers with local service
                providers through a simple digital platform.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Quick Links
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                <a href="#about" className="hover:text-blue-600">
                  About Us
                </a>
                <a href="#how-it-works" className="hover:text-blue-600">
                  How It Works
                </a>
                <a href="#features" className="hover:text-blue-600">
                  Features
                </a>
                <a href="#faq" className="hover:text-blue-600">
                  FAQs
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                For Customers
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                <Link to="/services" className="hover:text-blue-600">
                  Explore Services
                </Link>
                <Link to="/login" className="hover:text-blue-600">
                  Customer Login
                </Link>
                <Link to="/signup" className="hover:text-blue-600">
                  Create Account
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                For Providers
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                <Link
                  to="/provider/register"
                  className="hover:text-blue-600"
                >
                  Become a Provider
                </Link>
                <Link
                  to="/login"
                  className="hover:text-blue-600"
                >
                  Provider Login
                </Link>
              </div>
            </div>

          </div>

          <div className="mt-10 border-t border-gray-400 pt-6 text-center text-sm text-gray-900">
            © {new Date().getFullYear()} Digital Chok. All rights reserved.
          </div>

        </div>
      </footer>

    </main>
  );
};

export default LandingContent;

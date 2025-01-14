import React from "react";
import { Link } from "react-router-dom";
import robertPhoto from "../../../../assets/imgs/robert-brown.png";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function Reviews() {
  return (
    <section
      id="Reviews"
      className="relative overflow-hidden py-20 md:py-40 bg-white"
    >
      {/* Illustration behind content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32"
        aria-hidden="true"
      >
        <svg
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#71c5ee" offset="0%" />
              <stop stopColor="#025091" offset="77.402%" />
              <stop stopColor="#0f172aF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 -3)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div
        className="absolute left-1/2 top-0 transform  -translate-x-1/2   pointer-events-none -mb-32"
        aria-hidden="true"
      >
        <svg
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#71c5ee" offset="0%" />
              <stop stopColor="#025091" offset="77.402%" />
              <stop stopColor="#0f172aF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 -3)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <header className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="text-3xl font-bold !font-sans mb-5 lg:mb-10 lg:text-4xl text-orange-600 drop-shadow-md">
              Say Goodbye to Traditional Banking with E-Bank
            </h2>
            <p
              className="text-xl !font-sans text-gray-600"
              data-aos="zoom-y-out"
            >
              With over 20,000 satisfied clients all over Egypt, E-Bank is the
              ultimate banking solution for a fast, secure, and convenient
              banking experience. Say goodbye to long queues, paperwork, and
              outdated systems. Our innovative technology and personalized
              service make banking easier and more enjoyable than ever. Join the
              E-Bank revolution today and take control of your finances.{" "}
            </p>
          </header>

          {/* Testimonials */}
          <div className="max-w-3xl mx-auto mt-20" data-aos="zoom-y-out">
            <div className="relative flex items-start border-x-4 border-blue-800 rounded shadow">
              {/* Testimonial */}
              <div className="text-center md:px-12 py-20 md:pt-20 mx-4 md:mx-0">
              </div>
            </div>
            <div className="flex justify-center items-center my-5">
              <Link
                to="/register"
                className="flex justify-center items-center font-bold text-xl bg-teal-800 text-white hover:bg-white focus:bg-white  px-8 py-4  hover:text-blue-800 focus:text-blue-800 border-2  border-teal-800 hover:border-blue-800  focus:border-blue-800  rounded-lg
                shadow transition-all ease-in-out duration-300"
              >
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

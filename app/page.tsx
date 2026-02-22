"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const menuLayersRef = useRef<HTMLDivElement | null>(null)
  const menuContentRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  // Scroll Animation Refs
  const containerRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const paradoxRef = useRef<HTMLDivElement | null>(null)
  const overviewRef = useRef<HTMLDivElement | null>(null)
  const faqRef = useRef<HTMLDivElement | null>(null)

  const tl = useRef<gsap.core.Timeline | null>(null)

  const scrollToFeatures = () => {
    // The scroll animation ends at +=150%, so scrolling to 1.5x viewport height
    // should bring us to the fully revealed features section.
    window.scrollTo({
      top: window.innerHeight * 1.5,
      behavior: "smooth",
    })
  }

  useGSAP(
    () => {
      // Menu Animation
      if (!menuRef.current || !menuLayersRef.current || !menuContentRef.current || !closeButtonRef.current) return

      gsap.set(menuRef.current, { autoAlpha: 0 })
      gsap.set(closeButtonRef.current, { opacity: 0, scale: 0.8 })

      const layers = Array.from(menuLayersRef.current.children)
      const content = Array.from(menuContentRef.current.children)

      tl.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, { autoAlpha: 1, duration: 0 })
        .fromTo(
          layers,
          { clipPath: "circle(0% at 100% 100%)" },
          {
            clipPath: "circle(150% at 100% 100%)",
            duration: 1.2,
            ease: "power4.inOut",
            stagger: 0.1,
          },
        )
        .fromTo(
          content,
          { y: 100, opacity: 0, skewY: 5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.05,
          },
          "-=0.8",
        )
        .to(
          closeButtonRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        )

      // Scroll Animation
      if (containerRef.current && heroRef.current && paradoxRef.current && overviewRef.current && faqRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1800%", // Updated total scroll distance to 1800%
            scrub: true,
            pin: true,
          },
        })

        scrollTl
          .to({}, { duration: 2 })

          // First Transition: Hero -> Paradox (Features Section)
          .to(heroRef.current, {
            scale: 0.85,
            borderRadius: "40px",
            yPercent: -5,
            ease: "none",
            duration: 1, // Explicit duration for relative timing
          })
          .to(
            paradoxRef.current,
            {
              yPercent: -100,
              ease: "none",
              duration: 1, // Explicit duration
            },
            "<",
          )

          .to({}, { duration: 2 })

          // Second Transition: Paradox -> Overview
          .to(paradoxRef.current, {
            scale: 0.85,
            borderRadius: "40px",
            yPercent: -105,
            ease: "none",
            duration: 1, // Explicit duration
          })
          .to(
            overviewRef.current,
            {
              yPercent: -100,
              ease: "none",
              duration: 1, // Explicit duration
            },
            "<",
          )

          .to({}, { duration: 2 })

          // Third Transition: Overview -> FAQ
          .to(overviewRef.current, {
            scale: 0.85,
            borderRadius: "40px",
            yPercent: -105,
            ease: "none",
            duration: 1, // Explicit duration
          })
          .to(
            faqRef.current,
            {
              yPercent: -100,
              ease: "none",
              duration: 1, // Explicit duration
            },
            "<",
          )
      }
    },
    { scope: containerRef }, // Scope to container for scroll trigger
  )

  useEffect(() => {
    if (!tl.current) return
    if (isMenuOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isMenuOpen])

  return (
    <div ref={containerRef} className="h-screen bg-black flex flex-col gap-[10px] pb-[10px] overflow-hidden">
      {/* Full Page Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-50 invisible opacity-0 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div ref={menuLayersRef} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-emerald-700" />
          <div className="absolute inset-0 bg-emerald-600" />
          <div className="absolute inset-0 bg-emerald-500" />
        </div>

        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <div ref={menuContentRef} className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-8">
              <span className="text-emerald-900 text-sm font-bold tracking-widest uppercase mb-4">Navigation</span>
              {["Home", "Models", "Research", "Company"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-6xl md:text-8xl font-semibold text-white hover:text-emerald-900 transition-colors uppercase tracking-tighter"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-8 md:pt-24">
              <span className="text-emerald-900 text-sm font-bold tracking-widest uppercase mb-4">Products</span>
              {["Moravec 04", "Paradox", "Legacy", "Parts"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-6xl md:text-8xl font-semibold text-white hover:text-emerald-900 transition-colors uppercase tracking-tighter"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-8 md:pt-48">
              <span className="text-emerald-900 text-sm font-bold tracking-widest uppercase mb-4">Social</span>
              {["Twitter", "Instagram", "LinkedIn", "Youtube"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-6xl md:text-8xl font-semibold text-white hover:text-emerald-900 transition-colors uppercase tracking-tighter"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-emerald-900 transition-colors z-50"
          >
            <div className="relative w-8 h-8">
              <span className="absolute top-1/2 left-0 w-8 h-[2px] bg-current rotate-45 -translate-y-1/2" />
              <span className="absolute top-1/2 left-0 w-8 h-[2px] bg-current -rotate-45 -translate-y-1/2" />
            </div>
          </button>
        </div>
      </div>

      {/* HEADER */}
      <header className="flex-none flex items-center justify-between w-full py-4 sm:py-6 lg:py-8 px-[10px] relative z-40">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <Image src="/images/morvacec_icon.svg" alt="Moravec Logo" width={32} height={32} className="h-8 w-auto" />
        </Link>
        <nav className="hidden lg:flex gap-32 xl:gap-60">
          <Link
            href="#"
            className="text-sm xl:text-base font-thin uppercase tracking-wide text-white hover:opacity-70 transition-opacity"
          >
            Moravec 04
          </Link>
          <Link
            href="#"
            className="text-sm xl:text-base font-thin uppercase tracking-wide text-white hover:opacity-70 transition-opacity"
          >
            Ideations
          </Link>
          <Link
            href="#"
            className="text-sm xl:text-base font-thin uppercase tracking-wide text-white hover:opacity-70 transition-opacity"
          >
            Paradox Model
          </Link>
          <Link
            href="#"
            className="text-sm xl:text-base font-thin uppercase tracking-wide text-white hover:opacity-70 transition-opacity"
          >
            Order
          </Link>
        </nav>
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`relative flex h-8 w-8 items-center justify-center hover:opacity-70 transition-opacity duration-300 group ${
            isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span className="absolute h-[2px] w-[32px] bg-white translate-y-[-4px]" />
          <span className="absolute h-[2px] w-[32px] bg-white translate-y-[4px]" />
        </button>
      </header>

      {/* SCROLL CONTAINER */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* HERO */}
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-full overflow-hidden rounded-xl bg-white isolate will-change-transform"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              transform: "scale(1.2) translateX(-10%) translateY(2%)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-video-wfykIo9BQGqTS3Z6ocIIdDGgPyoApO.mp4" type="video/mp4" />
          </video>

          {/* Refactored positioning to use flexbox instead of transform. This prevents the creation of a stacking context that blocks mix-blend-mode. */}
          <div className="absolute inset-0 flex items-center justify-end pr-[2%] pointer-events-none">
            <div className="flex flex-col items-end pointer-events-auto w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
              <h1
                className="font-semibold text-white mix-blend-difference text-[12vw] lg:text-[10rem]"
                style={{
                  lineHeight: "0.9",
                  letterSpacing: "-0.13em",
                }}
              >
                MORAVEC04
              </h1>
              <div className="w-full flex flex-row justify-end">
                <p className="mt-4 sm:mt-6 font-thin max-w-md text-[#242424] text-base sm:text-lg text-right">
                  Meet our smartest humanoid yet
                </p>
              </div>

              <div className="w-full flex flex-row justify-end gap-4 mt-8">
                <a
                  href="https://v0.app/templates/the-future-is-now-rHTER3Yq6df?ref=ECY8G3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-emerald-600 transition-colors border border-black inline-block"
                >
                  Preorder
                </a>
                <button
                  onClick={scrollToFeatures}
                  className="bg-transparent text-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors border border-black"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex h-10 w-16 sm:h-12 sm:w-20 items-center justify-center rounded-full border border-black/20 backdrop-blur-sm">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Paradox Section */}
        <div
          ref={paradoxRef}
          className="absolute inset-0 top-full w-full h-full overflow-hidden rounded-xl bg-white isolate z-10 will-change-transform"
        >
          {/* Replaced video with full-width background image */}
          <Image
            src="/images/feature-bg.png"
            alt="Humanoid robot in living room"
            fill
            className="object-cover animate-scale-loop will-change-transform"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:justify-end lg:pr-[5%] pointer-events-none">
            <div className="flex flex-col items-start pointer-events-auto w-full max-w-2xl bg-black/80 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-white/10 shadow-sm">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tighter mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
                MORAVEC 04{" "}
                <span className="font-thin block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2">
                  with PARADOX
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-thin text-gray-300 mb-6 sm:mb-8 md:mb-10 leading-relaxed sm:leading-loose">
                Paradox is our new spatial reasoning model, allowing unrivaled movement and cognition of physical space.
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 w-full">
                {[
                  "Real-time environmental mapping and obstacle avoidance",
                  "Adaptive motor control for complex terrain navigation",
                  "Predictive interaction modeling for human collaboration",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 sm:gap-4">
                    <span className="mt-2 w-2 h-2 bg-white shrink-0" />
                    <span className="font-thin text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-colors w-full sm:w-auto">
                Preorder
              </button>
            </div>
          </div>
        </div>

        {/* Paradox Overview Section */}
        <div
          ref={overviewRef}
          className="absolute inset-0 top-full w-full h-full overflow-y-auto overflow-x-hidden rounded-xl bg-white isolate z-20 will-change-transform p-2 sm:p-3 md:p-4 scrollbar-hide"
        >
          <div className="w-full min-h-full grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pb-4 sm:pb-6">
            {/* Left Column - Main Paradox Info */}
            <div className="bg-black border border-black rounded-2xl sm:rounded-[30px] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center items-start min-h-[280px] max-h-[500px] lg:max-h-none lg:h-full relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 tracking-tighter leading-tight">
                  PARADOX
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-thin text-gray-300 leading-snug sm:leading-relaxed max-w-xl mb-4 sm:mb-6 md:mb-8">
                  Our proprietary spatial reasoning model. Paradox processes environmental data in real-time, allowing
                  for unrivaled movement, adaptive pathfinding, and true cognition of physical space. It doesn't just
                  see the world; it understands it.
                </p>
                <button className="bg-white text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-colors w-full sm:w-auto">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 min-h-[560px] lg:h-full">
              <div className="bg-emerald-500 border border-black rounded-2xl sm:rounded-[30px] p-4 sm:p-6 md:p-8 lg:p-12 flex-1 flex flex-col justify-between min-h-[260px]">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
                    Spatially Aware
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-thin text-white/90 leading-snug sm:leading-relaxed">
                    The first model that understands physics in real-time. By processing millions of environmental data
                    points per second, Paradox constructs a dynamic 3D understanding of its surroundings, enabling fluid
                    navigation through complex, unstructured environments with sub-millimeter precision.
                  </p>
                </div>
                <Link
                  href="#"
                  className="text-white font-normal text-sm sm:text-base md:text-lg flex items-center gap-2 hover:gap-4 transition-all duration-[800ms] ease-in-out mt-3 sm:mt-4 md:mt-6"
                >
                  Learn More
                  <svg
                    width="16"
                    height="16"
                    className="sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Second Feature Card */}
              <div className="bg-white border border-black rounded-2xl sm:rounded-[30px] p-4 sm:p-6 md:p-8 lg:p-12 flex-1 flex flex-col justify-between min-h-[260px]">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-black mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
                    Multimodal Physical Awareness
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-thin text-black/80 leading-snug sm:leading-relaxed">
                    Paradox integrates visual, auditory, and haptic sensors to create a unified perception system.
                    Combined with predictive physics simulations, Moravec can anticipate object trajectories, assess
                    weight and balance, and execute complex tasks requiring precision hand-eye coordination in
                    unpredictable environments.
                  </p>
                </div>
                <Link
                  href="#"
                  className="text-black font-normal text-sm sm:text-base md:text-lg flex items-center gap-2 hover:gap-4 transition-all duration-[800ms] ease-in-out mt-3 sm:mt-4 md:mt-6"
                >
                  Learn More
                  <svg
                    width="16"
                    height="16"
                    className="sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          ref={faqRef}
          className="absolute inset-0 top-full w-full h-full flex flex-col rounded-xl bg-black isolate z-30 will-change-transform overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 md:p-10 lg:p-12 scrollbar-hide">
            <div className="max-w-4xl mx-auto pb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {[
                  {
                    question: "When will MORAVEC04 be available?",
                    answer:
                      "MORAVEC04 is currently in the final stages of development. Pre-orders are now open, with the first units expected to ship in Q2 2026.",
                  },
                  {
                    question: "What is PARADOX?",
                    answer:
                      "PARADOX is the world's first real-time spatial reasoning model that combines visual, auditory, and haptic sensors with predictive physics simulations.",
                  },
                  {
                    question: "How long does the battery last?",
                    answer:
                      "MORAVEC04 features a high-capacity lithium battery system with up to 8 hours of continuous operation. Fast charging enables an 80% charge in just 45 minutes.",
                  },
                  {
                    question: "What safety features are included?",
                    answer:
                      "MORAVEC04 includes redundant sensor systems, emergency stop protocols, collision avoidance, and force-limited actuators. All units comply with ISO 13482 standards.",
                  },
                  {
                    question: "Is there a developer SDK available?",
                    answer:
                      "Yes, the Moravec SDK provides full access to sensor data, motor control, and the PARADOX spatial reasoning API, allowing developers to create custom applications and behaviors.",
                  },
                  {
                    question: "How is maintenance handled?",
                    answer:
                      "We offer a comprehensive service plan that includes annual on-site maintenance, 24/7 remote diagnostics, and rapid component replacement to ensure maximum uptime.",
                  },
                  {
                    question: "Can the hardware be customized?",
                    answer:
                      "MORAVEC04 features a modular design with standard mounting points and power/data ports, enabling the integration of third-party tools, grippers, and specialized sensors.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-white/20">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full py-3 sm:py-4 flex items-center justify-between text-left hover:text-emerald-500 transition-colors group"
                    >
                      <span className="text-sm sm:text-base md:text-lg font-normal pr-4 text-white">
                        {faq.question}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`shrink-0 transition-transform duration-300 text-white ${
                          openFaqIndex === index ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaqIndex === index ? "max-h-96 pb-3" : "max-h-0"
                      }`}
                    >
                      <p className="text-xs sm:text-sm text-white/80 font-thin leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full bg-black border-t border-white/20 p-6 sm:p-8 z-40">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                <div>
                  <Image
                    src="/images/morvacec_icon.svg"
                    alt="Moravec Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto mb-3 brightness-0 invert"
                  />
                  <p className="text-xs font-thin text-gray-400 leading-relaxed">
                    Building the future of humanoid robotics.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest mb-2 text-white">Company</h3>
                    <ul className="space-y-1">
                      {["About", "Careers", "Contact"].map((item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="text-xs font-thin text-gray-400 hover:text-emerald-500 transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest mb-2 text-white">Support</h3>
                    <ul className="space-y-1">
                      {["Docs", "FAQ", "Safety"].map((item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="text-xs font-thin text-gray-400 hover:text-emerald-500 transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
                <p className="text-xs font-thin text-gray-500">© 2026 Moravec Robotics</p>
                <div className="flex gap-4">
                  {["Privacy", "Terms"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-xs font-thin text-gray-500 hover:text-emerald-500 transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

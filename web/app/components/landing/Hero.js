"use client";

import { motion, useReducedMotion } from "framer-motion";

// Hero entrance: one orchestrated stagger on page load (badge → headline →
// copy → download buttons), then the product preview rises in below.
// Download button hrefs/targets come from page.js untouched — only the
// presentation layer (motion + glow) lives here.

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ winDownloadUrl, macDownloadUrl, releasesUrl }) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      variants={container}
      initial={reduced ? false : "hidden"}
      animate="show"
      className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-14 md:pt-32 md:pb-20 flex flex-col items-center text-center gap-stack-lg"
    >
      <motion.span
        variants={item}
        className="premium-eyebrow border border-border-subtle bg-surface-glass/70 rounded-full px-3 py-1.5"
      >
        AI coding companion
      </motion.span>

      <motion.h1
        variants={item}
        className="font-display text-headline-lg-mobile md:text-display text-on-background max-w-4xl leading-[1.04]"
      >
        Stop burning tokens on <span className="gradient-text">vague prompts.</span>
      </motion.h1>

      <motion.p variants={item} className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-8">
        Metriq analyzes your prompt against your real codebase before it ever reaches Claude, ChatGPT, Cursor,
        or VS Code, flagging what's too broad and rewriting it into something focused, so your AI tool
        doesn't waste tokens searching the whole project.
      </motion.p>

      <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="premium-button px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2"
          href={winDownloadUrl}
        >
          <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
          Download for Windows
        </motion.a>
        {[
          // macOS gets a direct asset download (same one-click behavior as
          // Windows, so no new tab); Linux has no packaged asset yet, so it
          // still points at the releases page.
          { os: "macOS", icon: "laptop_mac", href: macDownloadUrl, direct: true },
          { os: "Linux", icon: "dns", href: releasesUrl, direct: false },
        ].map((d) => (
          <motion.a
            key={d.os}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="premium-button-secondary px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2"
            href={d.href}
            {...(d.direct ? {} : { rel: "noreferrer noopener", target: "_blank" })}
          >
            <span className="material-symbols-outlined text-[18px]">{d.icon}</span>
            Download for {d.os}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}

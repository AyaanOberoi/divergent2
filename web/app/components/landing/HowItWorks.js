"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

// "How it works" — identical step copy to the original page (unchanged by
// requirement); the upgrade is staggered scroll reveals and a hover lift.

const STEPS = [
  {
    icon: "folder_open",
    title: "Link your project",
    body: "Point Metriq at a local folder (or a GitHub repo). It scans your real files so it knows what actually exists.",
  },
  {
    icon: "edit_note",
    title: "Draft your prompt",
    body: "Write what you're about to send to Claude, ChatGPT, Cursor, or VS Code, right inside Metriq first.",
  },
  {
    icon: "bolt",
    title: "Get instant feedback",
    body: "Metriq flags vague or broad instructions, estimates the token cost, and hands you a focused rewrite to paste in.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-20 md:pb-28">
      <Reveal>
        <h2 className="font-headline-lg text-headline-lg text-on-background text-center mb-12">
          How it works
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glass-card p-6 md:p-7 flex flex-col gap-3 h-full relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-on-background/35 to-transparent" />
              <div className="w-10 h-10 rounded-lg bg-on-background/[0.04] border border-border-subtle flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant/70">Step {i + 1}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">{step.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{step.body}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

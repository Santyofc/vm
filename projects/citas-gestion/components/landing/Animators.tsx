"use client";

import { motion } from "framer-motion";
import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStaggerItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedPulseIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, filter: "brightness(1.5)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type LinkAnimatedButtonProps = {
  children: ReactNode;
  className?: string;
  href: LinkProps["href"];
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href"> &
  Omit<LinkProps, "href">;

type ButtonAnimatedButtonProps = {
  children: ReactNode;
  className?: string;
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

type AnimatedButtonProps = LinkAnimatedButtonProps | ButtonAnimatedButtonProps;

export function AnimatedButton({
  children,
  className,
  ...rest
}: AnimatedButtonProps) {
  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest;
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <Link href={href} className={className} {...linkProps}>
          {children}
        </Link>
      </motion.div>
    );
  }

  const buttonProps = rest as Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="inline-block"
    >
      <button className={className} {...buttonProps}>
        {children}
      </button>
    </motion.div>
  );
}

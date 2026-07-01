"use client";

import { useEffect, useState } from "react";

const roles = ["Ingeniero de Sistemas", "Soy Diseñador UI/UX", "Soy Desarrollador React"];

export default function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const isComplete = letterIndex === currentRole.length;
    const isEmpty = letterIndex === 0;
    const delay = isComplete && !isDeleting ? 1300 : isDeleting ? 42 : 72;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setRoleIndex((current) => (current + 1) % roles.length);
        return;
      }

      setLetterIndex((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, letterIndex, roleIndex]);

  return (
    <p className="typewriter-role" aria-label={roles[roleIndex]}>
      <span>{roles[roleIndex].slice(0, letterIndex)}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </p>
  );
}

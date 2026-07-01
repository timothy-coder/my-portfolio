"use client";

import { useEffect, useState } from "react";
import PortfolioView from "./PortfolioView";

const STORAGE_KEY = "portfolio-data-v2";

export default function PortfolioClient({ defaultData }) {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return;

    try {
      setData(mergePortfolioData(defaultData, JSON.parse(storedData)));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return <PortfolioView data={data} />;
}

function mergePortfolioData(defaultData, storedData) {
  return {
    ...defaultData,
    ...storedData,
    profile: {
      ...defaultData.profile,
      ...storedData.profile,
      metrics: {
        ...defaultData.profile.metrics,
        ...storedData.profile?.metrics
      }
    },
    projects: storedData.projects || defaultData.projects,
    experience: storedData.experience || defaultData.experience,
    education: storedData.education || defaultData.education,
    skills: storedData.skills || defaultData.skills,
    certificates: storedData.certificates || defaultData.certificates,
    languages: storedData.languages || defaultData.languages,
    contact: storedData.contact || defaultData.contact
  };
}

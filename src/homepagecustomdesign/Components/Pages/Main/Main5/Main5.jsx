import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";

const stats = [
  { label: "Users Across to Pan India", value: 1000, suffix: "+" },
  { label: "Visitors", value: 2000, suffix: "+" },
  { label: "Products", value: 10, suffix: "+" },
  { label: "Cities Served", value: 5, suffix: "+" },
  { label: "Years in Business", value: 4, suffix: "+" },
];

const formatNumber = (num, suffix) => {
  if (suffix === "M+") return `${(num / 1_000_000).toFixed(0)}M+`;
  if (suffix === "K+") return `${(num / 1_000).toFixed(0)}K+`;
  return `${num}${suffix}`;
};

const ZohoStats = () => {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const intervals = stats.map((stat, i) => {
      const increment = Math.ceil(stat.value / 100);
      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          updated[i] = Math.min(updated[i] + increment, stat.value);
          return updated;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, [visible]);

  return (
    <div ref={ref} className="bg-blue-700 text-white py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10">DRIVEN BY YOUR GOALS.<br />POWERED BY OUR DEDICATION. </h2>
      <div className="grid md:grid-cols-3 gap-8 text-xl md:text-2xl font-medium">
        <div>
          <p className="text-4xl font-bold">
            {formatNumber(counts[0], stats[0].suffix)}
          </p>
          <p className="text-white/90 mt-1">{stats[0].label}</p>
        </div>
        <div>
          <p className="text-4xl font-bold">
            {formatNumber(counts[1], stats[1].suffix)}
          </p>
          <p className="text-white/90 mt-1">{stats[1].label}</p>
        </div>
        <div>
          <p className="text-4xl font-bold">
            {formatNumber(counts[2], stats[2].suffix)}
          </p>
          <p className="text-white/90 mt-1">{stats[2].label}</p>
        </div>
        <div>
          <p className="text-4xl font-bold">
            {formatNumber(counts[3], stats[3].suffix)}
          </p>
          <p className="text-white/90 mt-1">{stats[3].label}</p>
        </div>
        <div>
          <p className="text-4xl font-bold">
            {formatNumber(counts[4], stats[4].suffix)}
          </p>
          <p className="text-white/90 mt-1">{stats[4].label}</p>
        </div>
      </div>

      <div className="mt-10">
       <NavLink to='/about'> <button className="border px-6 py-3 rounded text-white hover:bg-white hover:text-blue-700 transition">
          MORE ABOUT NetliFycon →
        </button></NavLink>
      </div>
    </div>
  );
};

export default ZohoStats;

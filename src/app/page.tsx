"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Fruit {
  id: number;
  name: string;
  color: string;
}

interface Vegetable {
  id: number;
  name: string;
  color: string;
}

interface Version {
  version: string;
}

export default function HomePage() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [version, setVersion] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fruitsRes, vegetablesRes, versionRes] = await Promise.all([
          fetch("http://localhost:3000/fruits"),
          fetch("http://localhost:3000/vegetables"),
          fetch("http://localhost:3000/version"),
        ]);

        const fruitsData = await fruitsRes.json();
        const vegetablesData = await vegetablesRes.json();
        const versionData: Version = await versionRes.json();

        setFruits(fruitsData);
        setVegetables(vegetablesData);
        setVersion(versionData.version);
      } catch (err) {
        setError("Failed to fetch data from the server");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>

        {error && <div className="text-xl font-bold text-red-500">{error}</div>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
            <h3 className="text-2xl font-bold">Fruits</h3>
            <div className="text-lg">
              {fruits.map((fruit) => (
                <div key={fruit.id}>
                  {fruit.name} - {fruit.color}
                </div>
              ))}
            </div>
          </div>

          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
            <h3 className="text-2xl font-bold">Vegetables</h3>
            <div className="text-lg">
              {vegetables.map((vegetable) => (
                <div key={vegetable.id}>
                  {vegetable.name} - {vegetable.color}
                </div>
              ))}
            </div>
          </div>
        </div>

        {version && (
          <div className="text-sm text-gray-400">Server Version: {version}</div>
        )}
      </div>
    </main>
  );
}

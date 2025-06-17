import { href, NavLink } from "react-router";
import type { Route } from "./+types/home";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Password Manager" },
    { name: "description", content: "A secure store for all your passwords." },
  ];
}

export default function Home() {
  return (
    <main className="grid h-full place-content-center">
      <section className="flex flex-col items-center gap-10">
        <div className="flex gap-10">
          <NavLink to={href("/robot")} className="link">
            {({ isPending }) => (
              <span className={cn(isPending && "animate-pulse")}>🤖 robot</span>
            )}
          </NavLink>
          <NavLink to={href("/xstate")} className="link">
            {({ isPending }) => (
              <span className={cn(isPending && "animate-pulse")}>
                🦾 xstate
              </span>
            )}
          </NavLink>
        </div>
        <p className="text-content-secondary">State Machines</p>
      </section>
    </main>
  );
}

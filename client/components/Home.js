import React from "react";
import Login from "./Login";
import Header from "./Header";

export default function Home() {
  return (
    <>
      <section>
        <header>
          <Header />
        </header>
        <section>
          <Login />
        </section>
      </section>
    </>
  );
}

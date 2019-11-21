import React from "react";
import logo from "./banner.png";

export default function Login() {
  return (
    <>
      <section class="hero">
        <div class="grid-col2">
          <div class="flex-between text-center">
            <div class="padding">
              <h3>Log in to your Orbit account</h3>
              <p>
                Orbit is an automated application scoring sysytem by Altcampus
                to achieve hassle free and transparent flow for applicants.
              </p>
              <img src={logo} alt="banner" />
            </div>
          </div>
          <div class="padding box">
            <h3>LOG IN HERE</h3>
            <form name="form1" action="#">
              <input
                class="input-holder"
                type="text"
                name="Email"
                placeholder="Email"
              />
              <input
                class="input-holder"
                type="text"
                name="Password"
                placeholder="Password"
              />
              <div class="text-center">
                <button class="btn btn-primary">LOG IN</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

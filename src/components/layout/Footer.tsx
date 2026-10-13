import { navLinks, openingHours, site } from "../../config/site";
import { formatMinutes } from "../../lib/hours";
import TransitionLink from "../ui/TransitionLink";
import Logo from "./Logo";

const weekOrder = [1, 2, 3, 4, 5, 6, 0];

export default function Footer() {
  return (
    <footer className="border-t border-rice/10 bg-coal">
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-4 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-mist">
            Sushi e cucina cinese a Biella. All you can eat a pranzo e a cena, asporto e consegna a domicilio.
          </p>
          <div className="flex gap-3">
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Like su Facebook"
              className="grid size-10 place-items-center rounded-full border border-rice/15 text-lg text-rice/80 transition-colors duration-200 hover:border-shu-bright hover:text-rice"
            >
              <i className="ri-facebook-fill" aria-hidden />
            </a>
            <a
              href={site.tripadvisor}
              target="_blank"
              rel="noreferrer"
              aria-label="Like su Tripadvisor"
              className="grid size-10 place-items-center rounded-full border border-rice/15 text-lg text-rice/80 transition-colors duration-200 hover:border-shu-bright hover:text-rice"
            >
              <i className="ri-star-smile-line" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-rice/50">Dove</h3>
          <address className="flex flex-col gap-1 text-sm not-italic leading-relaxed text-rice/85">
            <span>{site.address.street}</span>
            <span>{site.address.city}</span>
            <a href={site.phone.href} className="mt-3 hover:text-shu-bright">
              {site.phone.label}
            </a>
            <a href={`mailto:${site.email}`} className="break-all hover:text-shu-bright">
              {site.email}
            </a>
          </address>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-rice/50">Orari</h3>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-rice/85">
            {weekOrder.map((d) => (
              <div key={d} className="contents">
                <dt className="text-mist">{openingHours[d].day.slice(0, 3)}</dt>
                <dd className="tabular-nums">
                  {openingHours[d].slots.map(([a, b]) => `${formatMinutes(a)}-${formatMinutes(b)}`).join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-rice/50">Pagine</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <TransitionLink to="/menu" className="text-rice/85 hover:text-shu-bright">
                Il menu
              </TransitionLink>
            </li>
            {navLinks.map((l) => (
              <li key={l.hash}>
                <TransitionLink to={{ pathname: "/", hash: `#${l.hash}` }} className="text-rice/85 hover:text-shu-bright">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-rice/10 flex">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-ash sm:px-8">
          © {new Date().getFullYear()} {site.fullName} · {site.address.street}, {site.address.city}
        </p>
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-ash sm:px-8"><a href="https://gianluh.dev/" target="_blank" rel="noreferrer">Developed and Designed by Gianluca De Maio <i className="ri-external-link-line"></i></a></p>
      </div>
    </footer>
  );
}

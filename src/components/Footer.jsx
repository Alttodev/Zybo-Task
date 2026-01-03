import Image from "next/image";
import Link from "next/link";

const socialIcons = [
  {
    href: "https://www.facebook.com/",
    src: "/assets/facebook.png",
    alt: "Facebook",
    width: 10,
    height: 18,
  },
  {
    href: "https://www.instagram.com/",
    src: "/assets/instagram.png",
    alt: "Instagram",
    width: 19,
    height: 20,
  },
  {
    href: "https://x.com/",
    src: "/assets/twitter.png",
    alt: "Twitter",
    width: 20,
    height: 19,
  },
];

function Footer() {
  return (
    <footer className="h-61 flex items-center bg-black justify-center">
      <div className="w-full max-w-330 px-6 flex items-center justify-between mx-auto">
        <Link href="/home" className="cursor-pointer">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={107}
            height={56}
            priority
          />
        </Link>
        <div className="flex items-center gap-11">
          {socialIcons.map((icon, index) => (
            <a
              href={icon.href}
              key={index}
              aria-label={icon.alt}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={icon.width}
                height={icon.height}
                priority
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import Image from "next/image";

export default function LoginLayout({ children }) {
  return (
    <main className="min-h-screen flex items-stretch">
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/assets/login.png"
          alt="Login image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-150">{children}</div>
      </div>
    </main>
  );
}

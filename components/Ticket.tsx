import Image from "next/image";

export default function Ticket({ name, email, avatar }: { name: string; email: string; avatar: string }) {
    return (
      <div className="border p-4 rounded-lg shadow-md bg-white mt-4 text-center max-w-sm mx-auto">
        <h2 className="text-xl font-bold" aria-label={`Ticket for ${name}`}>{name}</h2>
        <p className="text-gray-600" aria-label={`Email: ${email}`}>{email}</p>
        <figure>
        <Image 
  src={avatar} 
  alt={`${name}&apos;s avatar`} 
  width={96} 
  height={96} 
  className="rounded-full mt-2 mx-auto"
/>

          <figcaption className="sr-only">User's uploaded avatar</figcaption>
        </figure>
      </div>
    );
}

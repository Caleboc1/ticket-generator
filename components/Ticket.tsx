export default function Ticket({ name, email, avatar }: { name: string; email: string; avatar: string }) {
    return (
      <div className="border p-4 rounded-lg shadow-md bg-white mt-4 text-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{email}</p>
        <img src={avatar} alt="User Avatar" className="w-24 h-24 rounded-full mt-2 mx-auto" />
      </div>
    );
  }
  
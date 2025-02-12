"use client";

import { useState } from "react";
import Form from "@/components/Form";
import Ticket from "@/components/Ticket";

type TicketData = { name: string; email: string; avatar: string };

export default function Home() {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Conference Ticket Generator</h1>
      <Form onSubmit={(data: TicketData) => setTicketData(data)} />
      {ticketData && <Ticket {...ticketData} />}
    </main>
  );
}

import { RoomComponent } from "@/components/room-component";
export default function Dashboard() {
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <main className="flex flex-col flex-grow overflow-hidden p-0 w-full md:mx-auto">
        <RoomComponent />
      </main>
    </div>
  );
}

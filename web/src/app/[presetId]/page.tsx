import { RoomComponent } from "@/components/room-component";
export default function Dashboard({ params, searchParams }: { params: { presetId: string }, searchParams: { msg?:string } }) {
  
  const presetId = params.presetId;
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <main className="flex flex-col flex-grow overflow-hidden p-0 w-full md:mx-auto">
        <RoomComponent presetId={presetId} messages={searchParams.msg}/>
      </main>
    </div>
  );
}

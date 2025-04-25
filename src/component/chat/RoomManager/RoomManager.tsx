import CreateRoom from "./CreateRoom"
import RoomList from "./RoomList"

export default function RoomManager() {
  return (
    <div className=" border-r-2 border-r-white/15 px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl my-4">Rooms</h2>
        <CreateRoom />
      </div>
      <RoomList />
    </div>
  )
}

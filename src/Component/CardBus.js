import { Progress, Button } from "@chakra-ui/react";

const CardBus = (props) => {
  return (
    <>
      <div>
        <div className="container mx-auto shadow shadow-slate-200 mb-4">
          <div className=" flex flex-row border border-spacing-9 justify-between p-5">
            <div className=" flex flex-col justify-between w-[150px] ">
              <h1 className=" text-xl font-bold ">{props.name}</h1>
              <h2 className=" text-lg "> {props.class} </h2>
            </div>
            <div className=" flex flex-col justify-between w-fit  ">
              <h1 className=" text-lg ">14:00</h1>
              <h2 className=" text-lg ">{props.from}</h2>
            </div>
            <div className=" flex flex-col justify-between w-[10px] ">
              <h1 className=" text-lg "></h1>
              <h2 className=" text-lg "> - </h2>
            </div>
            <div className=" flex flex-col justify-between w-fit ">
              <h1 className=" text-lg">4:00</h1>
              <h2 className=" text-lg ">{props.to}</h2>
            </div>
            <div className=" flex flex-col justify-between gap-2 w-[300px] ">
              <div className=" text-xl font-bold ">Rp. {props.price}</div>
              <h2 className=" text-sm font-thin  ">
                {props.totalSeat - props.seatAvailable} Booked from
                {props.totalSeat} seat available
              </h2>
              <Progress
                value={
                  ((props.totalSeat - props.seatAvailable) / props.totalSeat) *
                  100
                }
                size="xs"
                colorScheme="pink"
              />
              {props.seatAvailable - props.totalTicket < 0 ? (
                <Button colorScheme="red">disable</Button>
              ) : (
                <Button onClick={() => props.handleBook(props.idTravel)}>
                  Book Seat
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBus;

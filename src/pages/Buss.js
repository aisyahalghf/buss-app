import { Input, Button, Select } from "@chakra-ui/react";
import { useRef, useState } from "react";
import CardBus from "../Component/CardBus";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Buss = () => {
  let from = useRef();
  let to = useRef();
  let scheduleDate = useRef();
  let totalTicket = useRef();
  let [data, setData] = useState([]);
  let [ticket, setTicket] = useState("");
  let navigate = useNavigate();

  const handleSearch = async () => {
    try {
      let inputFrom = from.current.value;
      let inputTo = to.current.value;
      let schedule = scheduleDate.current.value;
      let newSchedule = schedule.slice(0, 10);
      let inputTotalTicket = totalTicket.current.value;

      if (!inputFrom || !inputTo || !schedule || !inputTotalTicket)
        throw { message: "Search Data Not Complite" };

      let getBus = await axios.get(
        `http://localhost:4000/bus/search?from=${inputFrom}&to=${inputTo}&schedule_date=${newSchedule}`
      );
      setData(getBus.data.data);
      setTicket(inputTotalTicket);
    } catch (error) {
      toast(error.response.data.message);
      toast(error.message);
    }
  };

  const handleBook = (Id) => {
    const date = scheduleDate.current.value.slice(0, 10);
    const froms = from.current.value;
    const tos = to.current.value;
    navigate(
      `/detail/${Id}?schedule_date=${date}&from=${froms}&to=${tos}&totalTicket=${totalTicket.current.value}`
    );
  };

  const showData = () => {
    return data.map((val, idx) => {
      return (
        <div key={idx.toLocaleString()}>
          <CardBus
            name={val.name}
            from={val.from}
            to={val.to}
            price={val.price.toLocaleString()}
            class={val.class}
            totalSeat={val.total_seat}
            seatAvailable={val.seat_available}
            totalTicket={ticket}
            idTravel={val.id}
            handleBook={handleBook}
          />
        </div>
      );
    });
  };

  return (
    <div className=" shadow-sm shadow-slate-200 flex flex-col justify-center gap-32 ">
      <div className=" flex container mx-auto justify-center mt-10 gap-5 ">
        <div>
          <Input ref={from} placeholder="FROM" />
        </div>
        <div>
          <Input ref={to} placeholder="TO" />
        </div>
        <div>
          <Input
            ref={scheduleDate}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
        <div>
          <Select ref={totalTicket} placeholder="Ticket">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
        </div>

        <div>
          <Button onClick={handleSearch}>Find Buss</Button>
        </div>
      </div>
      <div className=" container mx-auto ">{showData()}</div>
      <Toaster />
    </div>
  );
};
export default Buss;

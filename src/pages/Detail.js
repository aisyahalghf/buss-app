import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import CardDetail from "../Component/CardDetail";

const Detail = () => {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [totalSeat, setTotalSeat] = useState("");
  const [seatBooked, setSeatBooked] = useState("");
  const [seatNumb, setSeatNumb] = useState([]);
  const [message, setMessage] = useState("");
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  let query = useLocation().search.slice(0, -14);
  const totalTicket = searchParam.get("totalTicket");

  const showData = async () => {
    try {
      const getDataParams = await axios(
        `http://localhost:4000/bus/search/${Id}${query}`
      );
      setData(getDataParams.data.data[0]);
      setTotalSeat(getDataParams.data.data[0].total_seat);
      setSeatBooked(getDataParams.data.data[0].seat_number);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  const showSeat = () => {
    let newSeat = [];
    for (let i = totalSeat; i > 0; i--) {
      newSeat.push({ seat: i + "A" });
    }
    return newSeat;
  };
  let totalSeats = showSeat();

  const seatFilter = () => {
    return totalSeats.map((val, idx) => {
      return (
        <div key={idx.toLocaleString()}>
          <input
            onChange={(e) => handleChange(e)}
            type="checkbox"
            name={val.seat}
            id={val.seat}
            value={val.seat}
            disabled={seatBooked?.split(",").includes(val.seat)}
          />
          <label htmlFor="{val.seat}">{val.seat}</label>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    let newSeatNumb = [...seatNumb];
    if (e.target.checked === false) {
      let idxData = newSeatNumb.indexOf(e.target.value);
      newSeatNumb.splice(idxData, 1);
    } else {
      newSeatNumb.push(e.target.value);
    }

    if (newSeatNumb.length > totalTicket) {
      alert(`max select ${totalTicket}`);
      let idxData = newSeatNumb.indexOf(e.target.value);
      newSeatNumb.splice(idxData, 1);
    }

    setSeatNumb(newSeatNumb);
  };

  const handleBook = async (e) => {
    try {
      let bus_name = data.name;
      let from = data.from;
      let to = data.to;
      let schedule_date = query.slice(15, 25);
      let seat_number = seatNumb;
      let total_price = data.price * seatNumb.length;

      if (e.length === 0) throw toast("you need select your seat");

      if (message === "jwt malformed" || message === "jwt expired") {
        navigate("/login");
      }

      let getStorage = localStorage.my_Token;
      const transaction = await axios.post(
        `http://localhost:4000/bus/book/${Id}`,
        {
          bus_name,
          from,
          to,
          schedule_date,
          seat_number,
          total_price,
        },
        {
          headers: {
            Authorization: `${getStorage}`,
          },
        }
      );

      let expired = transaction.data.data.expired_date;
      let newExpired = expired.replaceAll("T", " ").slice(0, 19);

      toast(
        `Your Transaction has been process, please make a payment as soon at ${newExpired}`
      );
      navigate("/book");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className=" flex flex-row-reverse justify-between items-center container mx-auto m-[50px]">
      <div className=" w-[40%] ">
        <CardDetail
          data={data}
          handleBook={handleBook}
          seatNumb={seatNumb}
          totalTicket={totalTicket}
        />
      </div>
      <div>
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          {seatFilter()}

          <div>
            <Icon
              className="text-[25px]"
              icon="game-icons:steering-wheel"
              rotate={3}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Detail;

import { useEffect, useRef, useState } from "react";
import {
  Button,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  let images = useRef();
  let [addFileName, setAddFileName] = useState("");
  let [addFile, setAddFile] = useState("");
  let [data, setData] = useState([]);
  const navigate = useNavigate();

  const onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      setAddFileName(e.target.files[0].name);
      setAddFile(e.target.files[0]);
      let preview = document.getElementById("imgprev");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const uploadPayment = async (e) => {
    const id = e.val.id;
    if (addFile) {
      let formData = new FormData();

      formData.append("images", addFile);
      await axios
        .post(`http://localhost:4000/bus/book/payments/${id}`, formData)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getDataTransactions = async () => {
    let getStorage = localStorage.my_Token;
    await axios
      .get(`http://localhost:4000/bus/book/getAll`, {
        headers: {
          Authorization: `${getStorage}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataTransactions();
  }, []);

  return (
    <div className=" flex flex-col container mx-auto  ">
      <div className="flex flex-row gap-2 justify-center mt-5">
        <Icon icon="ph:shopping-cart" className=" text-[40px] " />
        <Heading>CARTS</Heading>
      </div>
      <div className=" flex flex-row justify-between  mt-[80px]">
        <div className=" flex flex-col gap-[70px] ">
          <h1 className=" text-2xl font-bold text-center ">
            Your Transactions
          </h1>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>WhiteBus for your solutions</TableCaption>
              <Thead>
                <Tr>
                  <Th>Bus Name</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Schedule Date</Th>
                  <Th>Total Price</Th>
                  <Th>Status Payment</Th>
                  <Th>Expired Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((val, idx) => {
                  return (
                    <Tr key={idx.toLocaleString()}>
                      <Td>{val.bus_name}</Td>
                      <Td>{val.from}</Td>
                      <Td>{val.to}</Td>
                      <Td>{val.schedule_date.slice(0, 10)}</Td>
                      <Td>Rp. {val.total_price.toLocaleString()}</Td>
                      <Td>{val.status}</Td>
                      <Td>{val.expired_date.replace("T", " ").slice(0, 19)}</Td>
                      <Td>
                        <div className=" border border-slate-200 shadow shadow-slate-200 flex flex-col ">
                          <img id="imgprev" className=" w-40 " />
                          <div>
                            <Input
                              ref={images}
                              type="file"
                              name="images"
                              id="images"
                              onChange={onBtnAddFile}
                            />
                            <label htmlFor="images"></label>
                          </div>
                          <Button onClick={() => uploadPayment({ val })}>
                            upload payment
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

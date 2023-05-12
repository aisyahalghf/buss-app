import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
  Button,
} from "@chakra-ui/react";

const CardDetail = ({ data, handleBook, seatNumb, totalTicket }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {data?.name}
          <span className=" italic text-[15px]"> {data?.class}</span>
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              From and Destination
            </Heading>
            <Text pt="2" fontSize="sm">
              From : {data?.from}
            </Text>
            <Text pt="2" fontSize="sm">
              Destination : {data?.to}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Seat Number
            </Heading>
            <Text pt="2" fontSize="sm">
              {seatNumb + " "} / {totalTicket}
              <span className=" italic text-xs ">seat selected</span>
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Price per Item
            </Heading>
            <Text pt="2" fontSize="sm">
              Rp. {data?.price}
            </Text>
          </Box>
          <div className=" flex flex-row justify-between ">
            <Box>
              <Heading size="md" textTransform="uppercase">
                Total Price
              </Heading>
              <Text pt="2" fontSize="md">
                Rp. {data?.price * seatNumb.length}
              </Text>
            </Box>
            <Box>
              <Button onClick={() => handleBook(seatNumb)}> Book Now </Button>
            </Box>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardDetail;

import { _axios } from "../helper/httpService";

const getUpcommingEvents = () => {
  return _axios("get", "/upcoming-events");
};

const getUpcommingDetail = (id) => {
 return _axios("get", `/upcoming-event/${id}`);
};

export default {
  getUpcommingEvents,
  getUpcommingDetail,
};

import { _axios } from "../helper/httpService";

const getUpcommingEvents = () => {
  return _axios("get", "/upcoming-events");
};

const getUpcommingDetail = (id) => {
  return _axios("get", `/upcoming-event/${id}`);
};

const eventJoin = (id) => {
  return _axios("post", `/upcoming-event-joiner`, { event_id: id });
};

const cacnelJoin = (eventid, joinerId) => {
  return _axios("delete", `/upcoming-event-joiner/${eventid}/${joinerId}`);
};

export default {
  getUpcommingEvents,
  getUpcommingDetail,
  eventJoin,
  cacnelJoin,
};

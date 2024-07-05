import axios from "axios";

const paytechService = {
  makePayment: (data) => {
    return axios.post("./paytech.php", data);
  },
};

export default paytechService;

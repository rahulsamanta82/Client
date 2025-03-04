import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_PREFIX;
// axios.defaults.baseURL = 'http://iub.ums.com.pk/api';

export default axios;
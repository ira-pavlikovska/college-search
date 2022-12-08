import axios from "axios";

const SEARCH_API = "https://api.data.gov/ed/collegescorecard/v1/schools";

const API_KEY = 'M58NV5G94MBxfMJTKCaTT8npyarzrbnea5nchvNI'

export const getSchools = () =>
  axios.get(`${SEARCH_API}?api_key=${API_KEY}&per_page=10&_fields=id,school.name,school.city,school.state`);

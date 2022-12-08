import axios from "axios";

const SEARCH_API = "https://api.data.gov/ed/collegescorecard/v1/schools";

const API_KEY = 'M58NV5G94MBxfMJTKCaTT8npyarzrbnea5nchvNI'

export const getSchools = (keyword) => {
  let url = `${SEARCH_API}?api_key=${API_KEY}&per_page=10&_fields=id,school.name,school.city,school.state,location.lat,location.lon`
  if (keyword) {
    url += `&school.name=${keyword}`
  }
  return axios.get(url);
}

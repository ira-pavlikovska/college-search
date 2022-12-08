import axios from "axios";
import {COLLEGE_API_KEY} from "../constants";

const SEARCH_API = "https://api.data.gov/ed/collegescorecard/v1/schools";

export const getSchools = (keyword) => {
  let url = `${SEARCH_API}?api_key=${COLLEGE_API_KEY}&per_page=10&_fields=id,school.name,school.city,school.state,location.lat,location.lon`
  if (keyword) {
    url += `&school.name=${keyword}`
  }
  return axios.get(url);
}

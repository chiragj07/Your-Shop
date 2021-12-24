import { FETCH_USER } from "./user.types";

const fetchUserReq= user=>{
    return {
        type: FETCH_USER,
        payload: user
    }
}

export default fetchUserReq
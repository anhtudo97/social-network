import axios from "axios";
import cookie from "js-cookie";

import baseURL from "./baseURL";

export const getUserInfo = async(userId) => {
    try {
        const {
            data: { name, profilePicUrl },
        } = await axios.get(`${baseURL}/api/chats/user/${userId}`, {
            headers: { Authorization: cookie.get("token") },
        });

        return {
            name,
            profilePicUrl,
        };
    } catch (error) {
        console.log(error);
    }
};
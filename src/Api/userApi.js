import axiosClient from "./axiosClient";

const userApi = {
   
    login(email, password) {
        const url = '/auth/login';
        return axiosClient
            .post(url, {
                email,
                password,
            })
            .then(response => {
                console.log(response);
                if (response.status) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                }
                return response;
            });
    },

    getProfile() {
        const url = '/user/profile';
        return axiosClient.get(url);
    },

    updateProfile(data, id) {
        const url = '/user/updateProfile/' + id;
        return axiosClient.put(url, data);
    },

    forgotPassword(data) {
        const url = '/auth/forgot-password';
        return axiosClient.post(url, data);
    },

    listUserByAdmin() {
        const url = '/accounts/';
        return axiosClient.get(url);
    },

    banAccount(data, id) {
        const url = '/accounts/updateMatrangthai/' + id;
        return axiosClient.put(url, data);
    },

    unBanAccount(data, id) {
        const url = '/accounts/updateMatrangthai/' + id;
        return axiosClient.put(url, data);
    },

    searchUser(email) {
        console.log(email);
        const url = '/accounts/search?keyword='+email.target.value;
        return axiosClient.get(url);
    },

}

export default userApi;
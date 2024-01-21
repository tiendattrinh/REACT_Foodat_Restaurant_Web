import axiosClient from "./axiosClient";

const billManagementApi = {
    async listbillManagement() {
        const url = 'hoadonAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async createbillManagement(data) {
        const url = 'hoadonAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async updatebillManagement(data, id) {
        const url = 'hoadonAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async searchbillManagement(name) {
        const url = 'hoadonAdmin/search?keyword=' + name.target.value;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deletebillManagement(id) {
        const url = 'hoadonAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.delete(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDetailbillManagement(id) {
        const url = 'hoadonAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },  
}

export default billManagementApi;

import axiosClient from "./axiosClient";

const cheffManagementApi = {
    async listCheffManagement() {
        const url = 'daubepAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async createCheffManagement(data) {
        const url = 'daubepAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async updateCheffManagement(data, id) {
        const url = 'daubepAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async searchCheffManagement(name) {
        const url = 'daubepAdmin/search?keyword=' + name.target.value;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deleteCheffManagement(id) {
        const url = 'daubepAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.delete(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDetailCheffManagement(id) {
        const url = 'daubepAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default cheffManagementApi;

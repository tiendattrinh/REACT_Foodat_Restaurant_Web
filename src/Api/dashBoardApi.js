import axiosClient from "./axiosClient";

const dashBoardApi = {

    async getStatisticsMonth() {
        const url = `dashboard/total-month`;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async getAssetStatistics() {
        const url = `dashboard/total-orders`;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDashboardTotalRevenue() {
        const url = `dashboard/total-revenue`;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDashboardTopProducts() {
        const url = `dashboard/top-products`;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDashboardTotalUsers() {
        const url = `dashboard/total-user`;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default dashBoardApi;

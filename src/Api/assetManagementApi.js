import axiosClient from "./axiosClient";

const assetManagementApi = {
    async listAssetManagement() {
        const url = 'sanphamAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async listAssetReports(id) {
        const url = 'sanphamAdmin/'+id+"/reports";
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getsanphamAdmintatistics(year, month) {
        const url = `statistics?year=${year}&month=${month}`;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async createAssetManagement(data) {
        const url = 'sanphamAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async createAssetReports(data) {
        const url = 'sanphamAdmin/reports';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async updateAssetManagement(data, id) {
        const url = 'sanphamAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async searchAssetManagement(name) {
        const url = 'sanphamAdmin/search?keyword=' + name.target.value;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deleteAssetManagement(id) {
        const url = 'sanphamAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.delete(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDetailAssetManagement(id) {
        const url = 'sanphamAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },  
    async searchsanphamAdminByName(name) {
        const url = 'sanphamAdmin/searchAssetReport?name=' + name.target.value;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },  
}

export default assetManagementApi;

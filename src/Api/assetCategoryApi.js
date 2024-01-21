import axiosClient from "./axiosClient";

const assetCategoryApi = {
    async listAssetCategories() {
        const url = 'loaihangAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async createAssetCategory(data) {
        const url = 'loaihangAdmin';
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async updateAssetCategory(data, id) {
        const url = 'loaihangAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async searchAssetCategory(name) {
        const url = 'loaihangAdmin/search?keyword=' + name.target.value;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deleteAssetCategory(id) {
        const url = 'loaihangAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.delete(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDetailAssetCategory(id) {
        const url = 'loaihangAdmin/' + id;
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },  
}

export default assetCategoryApi;

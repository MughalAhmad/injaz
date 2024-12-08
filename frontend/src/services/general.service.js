import Service from "./service";
class GeneralService extends Service {
    constructor() {
        super()
    }

    async createUser(data) {
        return await this.ApiClient.post('/user/new',data);
    }
    async getAllUsers() {
        return await this.ApiClient.get('/user/');
    }
    async getUser(data) {
        return await this.ApiClient.get(`/user/${data}`);
    }
    async updateUser(data) {
        return await this.ApiClient.put(`/user/edit/${data._id}`,data);
    }
    async deleteUser(data) {
        return await this.ApiClient.delete(`/user/delete/${data}`);
    }

    // Reference

    async createRef(data) {
        return await this.ApiClient.post('/reference/new',data);
    }
    async getAllRefs() {
        return await this.ApiClient.get('/reference/');
    }
    async getRef(data) {
        return await this.ApiClient.get(`/reference/${data}`);
    }
    async updateRef(data) {
        return await this.ApiClient.put(`/reference/edit/${data._id}`,data);
    }
    async deleteRef(data) {
        return await this.ApiClient.delete(`/reference/delete/${data}`);
    }

}

export default GeneralService;
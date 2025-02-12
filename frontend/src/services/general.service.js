import Service from "./service";
class GeneralService extends Service {
    constructor() {
        super()
    }

    async createUser(data) {
        return await this.ApiClient.post('/user/new',data);
    }
    async getAllUsers(data) {
        return await this.ApiClient.get(`/user/getUserList${data.queryParams}`);
    }
    async getAllUsersNameAndId() {
        return await this.ApiClient.get(`/user/getAllUsersNameAndId`);
    }
    async getUser(data) {
        return await this.ApiClient.get(`/user/${data}`);
    }
    async updateUser(data) {
        return await this.ApiClient.put(`/user/edit/${data._id}`,data);
    }
    async assignToUser(data) {
        return await this.ApiClient.put(`/user/assign/${data.id}`,data.userData);
    }
    async deleteUser(data) {
        return await this.ApiClient.delete(`/user/delete/${data}`);
    }
    async sendEmailAndPassword(data) {
        return await this.ApiClient.get(`/user/sendEmailAndPassword/${data}`);
    }

    // Reference

    async createRef(data) {
        return await this.ApiClient.post('/reference/new',data);
    }
    async getAllRefs(data) {
        return await this.ApiClient.get(`/reference/getReferenceList${data.queryParams}`);
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
import Service from "./service";

class AdminService extends Service {
    constructor() {
        super()
    }

    async initialFetch() {
        return await this.ApiClient.get('/auth/initialFetch');
    }
    async userLogin(data) {
        return await this.ApiClient.post('/auth/login', data);
    }
   
    async userLogout(data) {
        return await this.ApiClient.get(`/auth/logout?fromAllDevices=${data.fromAllDevices}`);
    }
    async updateUserInfo(data) {
        return await this.ApiClient.put('/userInfo', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 120000
        });
    }
    async resetPassword(data) {
        return await this.ApiClient.post('/resetPassword', data);
    }
    async changePassword(resetToken, data) {
        return await this.ApiClient.put(`/changePassword/${resetToken}`, data);
    }

}

export default AdminService;
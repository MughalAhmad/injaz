import Service from "./service";
class GeneralService extends Service {
    constructor() {
        super()
    }

    async createUser(data) {
        return await this.ApiClient.post('/user/new',data);
    }

}

export default GeneralService;
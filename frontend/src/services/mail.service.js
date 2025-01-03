import Service from "./service";

class MailService extends Service {
    constructor() {
        super()
    }
    async sendMailResponse(data) {
        return await this.ApiClient.post(`/pdf/changePdfStatus?token=${data}`);
    }

}

export default MailService;
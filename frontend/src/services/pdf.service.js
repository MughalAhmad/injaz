import Service from "./service";

class PdfService extends Service {
    constructor() {
        super()
    }

    async createPdf(data) {
        return await this.ApiClient.post('/pdf/create', data);
    }
    async getAllPdf(data) {
        return await this.ApiClient.get(`/pdf/getAllPdf?company=${data.companyName}&&userId=${data.userId}&&role=${data.role}`);
    }
    async getDashboardData(data) {
        return await this.ApiClient.get(`/pdf/dashboard?company=${data.companyName}&&userId=${data.userId}&&role=${data.role}`);
    }

}

export default PdfService;
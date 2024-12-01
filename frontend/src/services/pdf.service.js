import Service from "./service";

class PdfService extends Service {
    constructor() {
        super()
    }

    async createPdf(data) {
        return await this.ApiClient.post('/pdf/create', data);
    }
    async getAllPdf(data) {
        return await this.ApiClient.get(`/pdf/getAllPdf?company=${data}`);
    }

}

export default PdfService;
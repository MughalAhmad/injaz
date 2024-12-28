import Service from "./service";

class PdfService extends Service {
    constructor() {
        super()
    }

    async createPdf(data) {
        return await this.ApiClient.post('/pdf/create', data);
    }
    async getAllPdf(data) {
        return await this.ApiClient.get(`/pdf/getAllPdf?company=${data.companyName}&&userId=${data.userId}&&role=${data.role}&&currentPage=${data.currentPage}`);
    }
    async getNoficationData(data) {
        return await this.ApiClient.get(`/pdf/getNoficationData?company=${data.companyName}&&userId=${data.userId}`);
    }
    async updateNotification(data) {
        return await this.ApiClient.put(`/pdf/updateNotification?pdfId=${data}`);
    }
    async getDashboardData(data) {
        return await this.ApiClient.get(`/pdf/dashboard?company=${data.companyName}&&userId=${data.userId}&&role=${data.role}&&currentPage=${data.currentPage}&&sortValue=${data.sortValue}`);
    }
    async allRefs() {
        return await this.ApiClient.get(`/pdf/allRefs`);
    }
}

export default PdfService;
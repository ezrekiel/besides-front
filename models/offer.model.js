export class Offer {
    constructor(offerID, title, companyName, libelle, postedAt, jobType, workingTime, contractType, salary, adress, zipCode, country, city) {
        this.offerID = offerID, 
        this.title = title, 
        this.companyName = companyName, 
        this.libelle = libelle, 
        this.postedAt = postedAt, 
        this.jobType = jobType, 
        this.workingTime = workingTime, 
        this.contractType = contractType,
        this.salary = salary,
        this.adress = adress, 
        this.zipCode = zipCode, 
        this.country = country, 
        this.city = city
    }

    getTableData() {
        return {
            offerID : this.offerID,
            title : this.title, 
            contractType : this.contractType
        };
    }
}
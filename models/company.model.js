export class Company {
    constructor(id, companyName, legalStatus, activitySector) {
        this.id = id, 
        this.companyName = companyName, 
        this.legalStatus = legalStatus, 
        this.activitySector = activitySector
    }

    getTableData() {
        return {
            id : this.id,
            companyName : this.companyName, 
            legalStatus : this.legalStatus,
            activitySector : this.activitySector
        };
    }
}
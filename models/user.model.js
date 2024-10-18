export class User {
    constructor(userID, companyID, username, firstName, lastName, phoneNumber, isAdmin, birthday, gender, employer, adress, zipCode, country, city) {
        this.userID = userID, 
        this.companyID = companyID, 
        this.username = username, 
        this.firstName = firstName, 
        this.lastName = lastName, 
        this.phoneNumber = phoneNumber, 
        this.isAdmin = isAdmin, 
        this.birthday = birthday,
        this.gender = gender,
        this.employer = employer,
        this.adress = adress, 
        this.zipCode = zipCode, 
        this.country = country, 
        this.city = city
    }

    getTableData() {
        return {
            "Id" : this.offerID,
            "Offre" : this.title, 
            "Contrat" : this.contractType
        };
    }
}
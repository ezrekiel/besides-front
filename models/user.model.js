export class User {
    constructor(userID, firstName, lastName, username) {
        this.userID = userID, 
        this.firstName = firstName, 
        this.lastName = lastName, 
        this.username = username
    }

    getTableData() {
        return {
            userID : this.userID,
            firstName : this.firstName, 
            lastName : this.lastName,
            username : this.username
        };
    }
}
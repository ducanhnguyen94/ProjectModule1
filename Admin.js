class Admin {
    home;
    host;

    constructor() {
        this.home = [];
        this.host = [];
    };
    

    RemoveData(index) {
        this.home.splice(index, 1);
        this.host.splice(index, 1);
    };


};

let retrieveData = JSON.parse(localStorage.getItem('Storage'));

let newAdmin = new Admin();
newAdmin.home = retrieveData.home;
newAdmin.host = retrieveData.host;

// newAdmin.host = retrieveData.host;
// newAdmin.home = retrieveData.home;

function checkValidInput(input) {
    if (input === "" || input === null) {
        alert('Không được bỏ trống!!!');
        return true;
    };
};


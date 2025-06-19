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


let Storage = new Admin();
Storage.home = retrieveData.home;
Storage.host = retrieveData.host;

let newAdmin = new Admin();
newAdmin.home = Storage.home;
newAdmin.host = Storage.host;

// newAdmin.host = retrieveData.host;
// newAdmin.home = retrieveData.home;

function checkValidInput(input) {
    if (input === "" || input === null) {
        alert('Không được bỏ trống!!!');
        return true;
    };
};



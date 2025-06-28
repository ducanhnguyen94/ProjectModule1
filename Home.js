class Home {
    id;
    dayStart;
    homeName;
    hostName;
    address;
    taxCode;
    room;
    guest;  

    constructor(dayStart, homeName, address, taxCode) {
        this.dayStart = dayStart;
        this.homeName = homeName;
        this.address = address;
        this.taxCode = taxCode;
        this.room = [];
        this.guest = [];
    }
};

class Room {
    name;
    price;
    guest;
    checkindate;
    checkoutdate;

    constructor(name, price, checkoutdate, checkindate) {
        this.name = name;
        this.price = price;
        this.guest = [];
        this.checkoutdate = checkoutdate;
        this.checkindate = checkindate;
    }
};

class Guest {
    id;
    name;
    dob;
    address;
    room;
    checkindate;
    checkoutdate;

    constructor(id, name, dob, address, room, checkoutdate, checkindate) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.address = address;
        this.room = room;
        this.checkoutdate = checkoutdate;
        this.checkindate = checkindate;
    };

};
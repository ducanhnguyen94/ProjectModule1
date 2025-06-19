class Home {
    id;
    dayStart;
    homeName;
    hostName;
    address;
    taxCode;    

    constructor(dayStart, homeName, address, taxCode) {
        this.dayStart = dayStart;
        this.homeName = homeName;
        this.address = address;
        this.taxCode = taxCode;
    }
}
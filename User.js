let storage = JSON.parse(localStorage.getItem('Storage'));
let homeName = document.getElementById('homeName');
let userInfo = document.getElementById('userInfo');
let index;

function logOut() {
    localStorage.setItem('IDinuse', "");
    window.location.replace("http://127.0.0.1:5500/index.html");
};

function getUserData() {
    let IDinuse = JSON.parse(localStorage.getItem('IDinuse'));
    
    for (let i = 0; i < storage.home.length; i++) {
        if (IDinuse === storage.home[i].id) {
            index = i;
            break;
        };
    };

    homeName.innerHTML = `
        <h1>${storage.home[index].homeName}</h1>
    `;

    let room = "";

    for (let i = 0; i < storage.home[index].room.length; i++) {
        let guest = "";
        for (let j = 0; j < storage.home[index].room[i].guest.length; j++) {
            guest += `<p>${storage.home[index].room[i].guest[j]}</p>`
        };
        room += `
            <div>
                <h2>${storage.home[index].room[i].name}</h2>
                <p>Ngày CheckIn: ${storage.home[index].room[i].checkindate}</p>
                <p>Ngày CheckOut: ${storage.home[index].room[i].checkoutdate}</p>
                <hr>
                ${guest}
                <button onclick="addGuest(${index}, ${i})">Thêm khách</button>
                <button onclick="checkOut(${index}, ${i})">Check Out</button>
            </div>
        `
    };

    userInfo.innerHTML = `
        <div class="roomInfo">
            ${room}
        </div>
    `;
};

function changePassword() {
    userInfo.innerHTML = `
        <table class="inputTable">
            <tr>
                <td>Mật khẩu mới</td>
                <td>
                    <input type="text" id="newPass" oninput="comparePass()">
                </td>
            </tr>
            <tr>
                <td>Nhập lại</td>
                <td>
                    <input type="text" id="rePass" oninput="comparePass()">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="confirmChange(${index})">Xác nhận</button>
                    <button onclick="getUserData()">Hủy</button>
                </td>
            </tr>
        </table>
    `;
};

function comparePass() {
    let newPass = document.getElementById('newPass');
    let rePass = document.getElementById('rePass');

    if (newPass.value !== rePass.value) {
        newPass.style.border = "3px solid red";
        rePass.style.border = "3px solid red";
    } else {
        newPass.style.border = "3px solid green";
        rePass.style.border = "3px solid green";
    };
};

function confirmChange(index) {
    let newPass = document.getElementById('newPass');
    let rePass = document.getElementById('rePass');

    if (newPass.value !== rePass.value) {
        alert('Mật khẩu không trùng khớp!!!');
    } else {
        let id = storage.home[index].id;
        localStorage.setItem(id, JSON.stringify(newPass.value));
    };
};

function createRoom() {
    userInfo.innerHTML = `
        <table class="inputTable">
            <tr>
                <td>Tên phòng</td>
                <td>
                    <input type="text" id="roomName">
                </td>
            </tr>
            <tr>
                <td>Giá</td>
                <td>
                    <input type="text" id="price">
                </td>
            </tr>
            <tr>
                <td>Thời gian CheckOut</td>
                <td>
                    <input type="date" id="checkindate" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <td>Thời gian CheckOut</td>
                <td>
                    <input type="date" id="checkoutdate" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <td>Tên khách</td>
                <td>
                    <input type="text" id="guestName">
                </td>
            </tr>
            <tr>
                <td>Số CCCD</td>
                <td>
                    <input type="text" id="guestID">
                </td>
            </tr>
            <tr>
                <td>Ngày sinh</td>
                <td>
                    <input type="date" id="dob" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td>
                    <input type="text" id="address">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="confirmCreate(${index})">Xác nhận</button>
                    <button onclick="getUserData()">Hủy</button>
                </td>
            </tr>
        </table>
    `;
};

function confirmCreate(index) {
    let roomName = document.getElementById('roomName').value;
    let price = document.getElementById('price').value;
    let checkInDate = document.getElementById('checkindate').value;
    let checkOutDate = document.getElementById('checkoutdate').value
    let guestName = document.getElementById('guestName').value;
    let guestID = document.getElementById('guestID').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;

    let newGuest = new Guest(guestID, guestName, dob, address, roomName, checkOutDate, checkInDate);
    let newRoom = new Room(roomName, price, checkOutDate, checkInDate);
    newRoom.guest.push(guestName);

    storage.home[index].guest.push(newGuest);
    storage.home[index].room.push(newRoom);

    localStorage.setItem('Storage', JSON.stringify(storage));
    getUserData();
};

function addGuest(index, i) {
    userInfo.innerHTML = `
        <table class="inputTable">
            <tr>
                <td>Tên khách</td>
                <td>
                    <input type="text" id="guestName">
                </td>
            </tr>
            <tr>
                <td>Số CCCD</td>
                <td>
                    <input type="text" id="guestID">
                </td>
            </tr>
            <tr>
                <td>Ngày sinh</td>
                <td>
                    <input type="date" id="dob" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td>
                    <input type="text" id="address">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="confirmAdd(${index}, ${i})">Xác nhận</button>
                    <button onclick="getUserData()">Hủy</button>
                </td>
            </tr>
        </table>
    `
};

function confirmAdd(index, i) {
    let guestName = document.getElementById('guestName').value;
    let guestID = document.getElementById('guestID').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;
    let checkInDate = storage.home[index].room[i].checkindate;
    let checkOutDate = storage.home[index].room[i].checkoutdate;
    let room = storage.home[index].room[i].name;

    let newGuest = new Guest(guestID, guestName, dob, address, room, checkOutDate, checkInDate);

    storage.home[index].guest.push(newGuest);
    storage.home[index].room[i].guest.push(guestName);

    localStorage.setItem('Storage', JSON.stringify(storage));

    getUserData();
};

function checkOut(index, i) {
    let roomInfo = storage.home[index].room[i];
    let checkIn = new Date(roomInfo.checkindate);
    let checkOut = new Date(roomInfo.checkoutdate);

    let startDay = Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
    let endDay = Date.UTC(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());

    let timesDif = Math.abs(endDay - startDay);
    let daysDif = Math.ceil(timesDif / (1000*60*60*24));

    let payment = daysDif * roomInfo.price;

    userInfo.innerHTML = `
        <table class="inputTable">
            <tr>
                <td>Số ngày lưu trú</td>
                <td>${daysDif}</td>
            </tr>
            <tr>
                <td>Tổng tiền</td>
                <td>${payment}</td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="confirmPayment(${index},${i})">Xác nhận</button>
                </td>
            </tr>
        </table>
    `;
};

function confirmPayment(index, i) {
    let roomData = storage.home[index].room;
    roomData.splice(i, 1);
    localStorage.setItem('Storage', JSON.stringify(storage));
    getUserData();
};

function history() {
    let html = "";

    let guestData = storage.home[index].guest;

    for (let i = 0; i < guestData.length; i++) {
        html += `
            <tr>
                <td>${guestData[i].name}</td>
                <td>${guestData[i].id}</td>
                <td>${guestData[i].dob}</td>
                <td>${guestData[i].address}</td>
                <td>${guestData[i].room}</td>
                <td>${guestData[i].checkindate}</td>
                <td>${guestData[i].checkoutdate}</td>
            </tr>
        `;
    };

    userInfo.innerHTML = `
        <table class="historyTable">
            <tr>
                <th>Tên Khách</th>
                <th>Số CCCD</th>
                <th>Ngày sinh</th>
                <th>Địa chỉ</th>
                <th>Phòng</th>
                <th>Ngày Check In</th>
                <th>Ngày Check Out</th>
            </tr>
            ${html}
        </table>
    `;
}

getUserData();
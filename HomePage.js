function createHost() {
    let uiBody = document.getElementById('uiBody');

    uiBody.innerHTML = `
        <table>
            <tr>
                <td colspan="2">
                    <h1>Khởi tạo cơ sở mới</h1>
                </td>
            </tr>
            <tr>
                <td class="title">Tên cơ sở:</td>
                <td>
                    <input type="text" id="homeName">
                </td>
            </tr>
            <tr>
                <td class="title">Ngày bắt đầu KD: </td>
                <td>
                    <input type="date" style="width: 97%;" id="dayStart">
                </td>
            </tr>
            <tr>
                <td class="title">Chủ cơ sở:</td>
                <td>
                    <input type="text" id="hostName">
                </td>
            </tr>
            <tr>
                <td class="title">Địa chỉ cơ sở:</td>
                <td>
                    <input type="text" id="address">
                </td>
            </tr>
            <tr>
                <td class="title">Mã thuế kinh doanh:</td>
                <td>
                    <input type="text" id="taxCode">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="saveHomeHost()">Tạo mã cơ sở</button>
                </td>
            </tr>
        </table>
    `
};

function saveHomeHost() {
    let homeName = document.getElementById('homeName').value;
    let dayStart = document.getElementById('dayStart').value;
    let hostName = document.getElementById('hostName').value;
    let address = document.getElementById('address').value;
    let taxCode = document.getElementById('taxCode').value;

    if (checkValidInput(homeName)) {
        return;
    };
    if (checkValidInput(dayStart)) {
        return;
    };
    if (checkValidInput(hostName)) {
        return;
    };
    if (checkValidInput(address)) {
        return;
    };
    if (checkValidInput(taxCode)) {
        return;
    };


    let newHome = new Home(dayStart, homeName, address, taxCode);

    let homeID = dayStart;
    while (homeID.includes('-')) {
        homeID = homeID.replace('-', '');
    };
    newHome.id = homeID + String(newAdmin.home.length + 1);

    let newHost = new Host(hostName);
    newHome.hostName = hostName;


    newAdmin.host.push(newHost);
    newAdmin.home.push(newHome);

    localStorage.setItem('Storage', JSON.stringify(newAdmin));
    localStorage.setItem(newHome.id, JSON.stringify(newHome.id));

    alert('Tên đăng nhặp và mật khẩu của host: ' + newHome.id);
    getAllData(newAdmin);
};

function getAllData(storage) {
    document.getElementById('uiHost').innerHTML = '';
    let homeData= newAdmin.home;

    let html = "";

    for (let i = 0; i < homeData.length; i++) {
        html += `
            <tr>
                <td id="${i}-homeName">${homeData[i].homeName}</td>
                <td id="${i}-hostName">${homeData[i].hostName}</td>
                <td id="${i}-address">${homeData[i].address}</td>
                <td id="${i}-taxCode">${homeData[i].taxCode}</td>
                <td id="${i}-dayStart">${homeData[i].dayStart}</td>
                <td>
                    <button onclick="showHostData(${i})">Thông tin chủ</button>                    
                    <button onclick="EditData(${i})">Chỉnh sửa</button>
                    <button onclick="history(${i})">Lịch sử</button>                     
                    <button onclick="DeleteData(${i})">Xóa</button>
                </td>
            </tr>
        `;
    };

    uiBody.innerHTML = `
        <table class="data">
            <tr>
                <td colspan="6">
                    <h1>Dữ liệu cơ sở lưu trú</h1>
                </td>
            </tr>
            <tr class="tableHeader">
                <td>Tên cơ sở</td>
                <td>Chủ cơ sở</td>
                <td>Địa chỉ</td>
                <td>Mã số kinh doanh</td>
                <td>Ngày bắt đầu</td>
                <td>Action</td>
            </tr>                          
            ${html}
        </table>
    `
};

function DeleteData(index) {
    localStorage.removeItem(newAdmin.home[index].id);
    newAdmin.RemoveData(index);
    localStorage.setItem('Storage', JSON.stringify(newAdmin));
    getAllData(newAdmin);
};

function EditData(index) {
    let homeData = newAdmin.home;
    let html = "";

    for (let i = 0; i < homeData.length; i++) {
        if (i === index) {
            html += `
                <tr>
                    <td id="${i}-homeName">
                        <input id="${index}-1" value="${homeData[index].homeName}">
                    </td>
                    <td id="${i}-hostName">
                        <input id="${index}-2" value="${homeData[index].hostName}">
                    </td>
                    <td id="${i}-address">
                        <input id="${index}-3" value="${homeData[index].address}">
                    </td>
                    <td id="${i}-taxCode">
                        <input id="${index}-4" value="${homeData[index].taxCode}">
                    </td>
                    <td id="${i}-dayStart">
                        <input id="${index}-5" value="${homeData[index].dayStart}">
                    </td>
                    <td>
                        <button onclick="confirmChange(${i})">Xác nhận</button>                    
                        <button onclick="getAllData('newAdmin')">Hủy bỏ</button>                    
                    </td>
                </tr>
            `;
        } else {
            html += `
                <tr>
                <td id="${i}-homeName">${homeData[i].homeName}</td>
                <td id="${i}-hostName">${homeData[i].hostName}</td>
                <td id="${i}-address">${homeData[i].address}</td>
                <td id="${i}-taxCode">${homeData[i].taxCode}</td>
                
                <td>
                    <button onclick="showHostData(${i})">Thông tin chủ</button>                    
                    <button onclick="EditData(${i})">Chỉnh sửa</button>                    
                    <button onclick="DeleteData(${i})">Xóa</button>
                </td>
            </tr>
            `;
        };
    };
    
    uiBody.innerHTML = `
        <table class="data">
            <tr>
                <td colspan="6">
                    <h1>Dữ liệu cơ sở lưu trú</h1>
                </td>
            </tr>
            <tr class="tableHeader">
                <td>Tên cơ sở</td>
                <td>Chủ cơ sở</td>
                <td>Địa chỉ</td>
                <td>Mã số kinh doanh</td>
                <td>Ngày bắt đầu</td>
                <td>Action</td>
            </tr>                          
            ${html}
        </table>
    `
};

function confirmChange(index) {
    let homeName = document.getElementById(`${index}-1`).value;
    let hostName = document.getElementById(`${index}-2`).value;
    let address = document.getElementById(`${index}-3`).value;
    let taxCode = document.getElementById(`${index}-4`).value;
    let dayStart = document.getElementById(`${index}-5`).value;

    newAdmin.home[index].homeName = homeName;
    newAdmin.home[index].hostName = hostName;
    newAdmin.home[index].address = address;
    newAdmin.home[index].address = address;
    newAdmin.home[index].taxCode = taxCode;
    newAdmin.home[index].dayStart = dayStart;

    newAdmin.host[index].name = hostName;

    localStorage.setItem('Storage', JSON.stringify(newAdmin));

    getAllData(newAdmin);
};

function showHostData(index) {
    let uiHost = document.getElementById('uiHost');

    uiHost.innerHTML = `
        <table class="hostData">
            <tr>
                <td rowspan="6">
                    <img src="https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg?width=260&s=bqZJIL0oRiDLHCxSpVc-YQ" alt="">
                </td>
                <th>Họ và tên: </th>
                <td>
                    <input type="text" id="name" value="${newAdmin.host[index].name}">
                </td>
            </tr>
            <tr>
                <th>Ngày sinh: </th>
                <td>
                    <input type="date" id="dob" value="${newAdmin.host[index].dob}">
                </td>
            </tr>
            <tr>
                <th>Số CCCD: </th>
                <td>
                    <input type="text" id="id" value="${newAdmin.host[index].id !== ""? newAdmin.host[index].id : ""}">
                </td>
            </tr>
            <tr>
                <th>Tạm trú: </th>
                <td>
                    <input type="text" id="address" value="${newAdmin.host[index].address !== ""? newAdmin.host[index].address : ""}">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="confirmHostChange(${index})">Lưu</button>
                    <button onclick="changeImg()">Thêm Ảnh</button>
                    <button onclick="getAllData(newAdmin)">Hủy</button>
                </td>
            </tr>
        </table>
    `
};

function confirmHostChange(index) {
    let name = document.getElementById('name').value;
    let dob = document.getElementById('dob').value;
    let id = document.getElementById('id').value;
    let address = document.getElementById('address').value;

    newAdmin.host[index].name = name;
    newAdmin.host[index].dob = dob;
    newAdmin.host[index].id = id;
    newAdmin.host[index].address = address;

    localStorage.setItem('Storage', JSON.stringify(newAdmin));
    getAllData(newAdmin);
};

function logOut() {
     window.location.replace("http://127.0.0.1:5500/index.html");
};

function history(index) {
    let html = "";

    let guestData = newAdmin.home[index].guest;

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

    uiBody.innerHTML = `
        <h1 style="text-align: center;">Cơ sở lưu trú ${newAdmin.home[index].homeName}</h1>
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

getAllData(newAdmin);




localStorage.setItem('admin', JSON.stringify('admin'));

function LogIn() {
    let uiBody = document.getElementById('uiBody');

    uiBody.innerHTML = `
        <table>
            <tr>
                <td colspan="2">
                    <h3>Log In</h3>
                </td>
            </tr>
            <tr>
                <td class="title">Tên đăng nhập:</td>
                <td>
                    <input type="text" id="LogInID">
                </td>
            </tr>
            <tr>
                <td class="title">Password:</td>
                <td>
                    <input type="password" id="password">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button onclick="confirmLogIn()">Log In</button>
                </td>              
            </tr>
        </table>
    `
}


function confirmLogIn() {
    let logIn = document.getElementById('LogInID').value;
    let password = document.getElementById('password').value;
    let confirmPassword = JSON.parse(localStorage.getItem(logIn));

    if (!confirmPassword || password !== confirmPassword) {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!!!');
        return;
    } else if (password !== confirmPassword) {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!!!');
        return;
    };

    if (logIn.includes('admin')) {
        window.location.replace('http://127.0.0.1:5500/Admin.html');
    } else {
        localStorage.setItem('IDinuse', JSON.stringify(logIn));
        window.location.replace('http://127.0.0.1:5500/User.html');
    };
};


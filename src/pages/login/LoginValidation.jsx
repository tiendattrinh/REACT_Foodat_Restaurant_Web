function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.email === "") {
        error.email = "Email không được để trống"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email không tồn tại"
    } else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Nhập password"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Password sai"
    } else {
        error.password = ""
    }
    return error;
}


export default Validation;
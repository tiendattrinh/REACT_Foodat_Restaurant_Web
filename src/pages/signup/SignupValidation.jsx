function Validation(values) {
    let error = {}
    const diachi_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const sdt_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const name_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.name === "") {
        error.name = "Nhập tên bạn"
    }
    else if (!name_pattern.test(values.name)) {
        error.name = "Nhập tên bạn"
    } else {
        error.name = ""
    }

    if (values.diachi === "") {
        error.diachi = "Nhập địa chỉ"
    }
    else if (!diachi_pattern.test(values.diachi)) {
        error.diachi = "Nhập địa chỉ"
    } else {
        error.diachi = ""
    }

    if (values.sdt === "") {
        error.name = "Nhập sdt"
    }
    else if (!sdt_pattern.test(values.sdt)) {
        error.sdt = "Nhập sdt"
    } else {
        error.sdt = ""
    }

    if (values.email === "") {
        error.email = "Nhập email"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Nhập email"
    } else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Nhập password"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Nhập password"
    } else {
        error.password = ""
    }
    return error;
}


export default Validation;
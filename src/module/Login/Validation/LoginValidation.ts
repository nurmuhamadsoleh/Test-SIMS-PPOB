export default function LoginValidation(values: any) {
    const error: any = {}
    const { email, password } = values
    if (!email) {
        error.email = "Username wajib diisi"
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
        error.email = "Format email tidak valid"
    }
    if (!password) {
        error.password = "Password wajib diisi"
    }
    return error
}
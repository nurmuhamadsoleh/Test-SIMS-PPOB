export default function RegistrasiValidation(values: any) {
  const error: any = {};
  const { email, password, confirm_password, first_name, last_name } = values;
  if (!email) {
    error.email = "Username wajib diisi";
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
    error.email = "Format email tidak valid";
  }
  if(!first_name) {
    error.first_name = "Nama depan wajib diisi";
  }
  if(!last_name) {
    error.last_name = "Nama belakang wajib diisi";
  }
  if(!confirm_password) {
    error.confirm_password = "Konfirmasi password sama dengan password";
  }
  if (!password) {
    error.password = "Password wajib diisi";
  } else if(password !== confirm_password) {
    error.confirm_password = "Password tidak sama";
  }
  return error;
}

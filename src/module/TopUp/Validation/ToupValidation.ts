export default function ToupValidation(value: any) {
  const error: any = {}
  const {
    TOUP
  } = value
  if (!TOUP) {
    error.TOUP = 'Pilih Nominal Toup'
  }
  return error
}

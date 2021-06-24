export default function onFetchError() {
  swal({
    text: 'There are no data to show',
    className: "error-fetch",
    button: false,
    timer: 2000,
  })
}
import { Loader } from "@googlemaps/js-api-loader"
import getRefs from './getRefs';

const refs = getRefs();

let map;
let marker;

const onLocationClick = e => {
  if (!e.target.classList.contains('js-location')) {
    return
  }
  const loader = new Loader({
    apiKey: "AIzaSyB_MgjKUjqfNFXC9EkEMOpcZWeydVUozWg",
  });
  loader.load().then(() => {
    const latLng = {
      lat: +e.target.dataset.latitude,
      lng: +e.target.dataset.longitude
    }
    map = new google.maps.Map(document.getElementById("map"), {
      center: latLng,
      zoom: 15,
    });
    marker = new google.maps.Marker({
      position: latLng
    });
    marker.setMap(map);
  });
  refs.locateModalBackdrop.classList.remove('visually-hidden')
}


const onGeoModalClick = e => {

  if (e.target.classList.contains('js-location-backdrop')) {

    refs.locateModalBackdrop.classList.add('visually-hidden')
  } else {
    return
  }
}
const onCloseGeoModalByEscKeydown = e => {
  if (e.code === 'Escape') {
    refs.locateModalBackdrop.classList.add('visually-hidden')
  }
}


window.addEventListener('keydown', onCloseGeoModalByEscKeydown);
refs.locateModalBackdrop.addEventListener('click', onGeoModalClick);
refs.openModalBtn.addEventListener('click', onLocationClick)
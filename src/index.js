import $ from 'jquery';
import Handlebars from 'handlebars';

let accessToken = null;
const itemTemplateSource = $('#result').html();
const itemTemplate = Handlebars.compile(itemTemplateSource);
const audioPlayer = new Audio();

const login = (callback) => {
  const CLIENT_ID = '7b1fc9ad7b5d4197a17901f7b62677e0';
  const REDIRECT_URI = 'http://labs.kryptonik.net/spotify-oauth-localhost-proxy/';
  const getLoginURL = (scopes) => {
      return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
        '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
        '&scope=' + encodeURIComponent(scopes.join(' ')) +
        '&response_type=token';
  };
  
  const url = getLoginURL([
      'user-read-email'
  ]);
  
  const width = 450;
  const height = 730;
  const left = (screen.width / 2) - (width / 2); // eslint-disable-line no-restricted-globals
  const top = (screen.height / 2) - (height / 2); // eslint-disable-line no-restricted-globals

  window.addEventListener("message", (event) => {
      var hash = JSON.parse(event.data);
      if (hash.type === 'access_token') {
          accessToken = hash.access_token;
          callback(null, true);
      }
  }, false);
  
  window.open(url,
    'Spotify',
    'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
  );
}

const displaySearch = () => {
  $('.login').hide();
  $('.input-group').css({
    display: 'table',
  });
};

const attachEvents = () => {
  $('#search').click(() => {
    // Step 4
  });
  $('#list').on('click', '.album', (e) => {
    // Step 9
  });

  // for login
  $('#login').click(() => {
    login(displaySearch);
  });
};

// Step 4

const callSpotifyTrack = (albumId) => {
  $.ajax({
    url: '', //Step 9
    success: (response) => {
      // Step 9
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};


attachEvents();
import $ from 'jquery';
import Handlebars from 'handlebars';

const itemTemplateSource = $('#result').html();
const itemTemplate = Handlebars.compile(itemTemplateSource);
const playerTemplateSource = $('#player').html();
const playerTemplate = Handlebars.compile(playerTemplateSource);
const audioPlayer = new Audio();

const attachEvents = () => {
  $('#search').click(() => {
    const query = $('#text').val();
    console.log('query', query);
    callSpotifyAlbums(query);
  });
  $('#list').on('click', '.album', (e) => {
    const img = $(e.target).parents('.album').find('.cover');
    const id = img.data('albumId');
    callSpotifyTrack(id);
  });
};

const callSpotifyAlbums = (query) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      type: 'album',
      q: query,
    },
    success: (response) => {
      console.log('#callSpotifyAlbums response', response.albums.items);
      $('#list').empty();
      const items = response.albums.items;
      items.forEach((item) => {
        $('#list').append(itemTemplate(item));
      });
    }
  });
};

const callSpotifyTrack = (albumId) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/albums/' + albumId,
    success: (response) => {
      console.log('#callSpotifyTrack response', response);
      const track = response.tracks.items[0]; // to simplify we purposefully use the first track of each album
      const url = track.preview_url;
      const player = {
        title: track.name,
        artist: track.artists[0].name,
        album: response.name
      };
      audioPlayer.pause();
      audioPlayer.src = url;
      $('#player-container')
        .html(playerTemplate(player))
        .find('.player')
        .removeClass('hide');
      audioPlayer.play();
    }
  });
};


attachEvents();

$('.upload-btn').on('click', function () {
  $('#upload-input').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});


$('#upload-input').on('change', function () {

  var files = $(this).get(0).files;

  if (files.length > 0) {
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('photo', file, file.name);
    }
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log('upload successful!\n');
        var html = '<table class="table table-hover table-condensed table-bordered"><thead><tr><td>STT</td><td>File Name</td><td>Link</td></tr></thead> <tbody>';
        data.data.forEach(function (item, k) {
          html += '<tr><td>' + (k + 1) + '</td><td>' + item.originalname + '</td><td>' + '<a target="_blank" style="color: blue" href="' + data.url + item.originalname + '">' + data.url + item.originalname + '</a>' + '</td></tr>';
        });
        html += '</tbody></table>';
        $("div#result").append(html);
      },
      xhr: function () {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function (evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }

          }

        }, false);

        return xhr;
      }
    });

  }
});
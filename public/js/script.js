$(document).ready(function () {
    const input = $('.city-id');
    const button = $('.send-request');
    const successMessage = $('.success-message');

    button.on('click', function (e) {
        e.preventDefault();
        const areaID = input.val();

        $.get("writeCoords", { areaID: areaID })
            .done(function (data) {
                    console.log(data);
                    successMessage.show();
                }
            );
    });
});

// const areaID = 959219; - город Ижевск

/*$.getJSON(`http://global.mapit.mysociety.org/area/${areaID}.geojson`, ({ coordinates }) => {
 const flattenCoordinates = _.flattenDepth(coordinates, 2);
 const output = flattenCoordinates.map(item => {
 const nItem = `<p>${item}</p>`;
 return nItem.replace(',', ' ');
 });
 $('.coordinates').html(output);
 });*/
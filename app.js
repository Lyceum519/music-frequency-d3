// 2017. 07. 30
$(document).ready(function () {
  console.log ( 'zzz' );
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var temp = new Uint8Array( 1200 );

var svgHeight = '300';
var svgWidth = '1200';
var barPadding = '0';

function createSvg(parent, height, width) {
  return d3.select(parent).append('svg').attr('height', height).attr('width', width);
}
var svg = createSvg('body', svgHeight,  svgWidth );
svg.selectAll('rect')
     .data( temp )
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / temp.length);
     })
     .attr('width', svgWidth / temp.length - barPadding);

function getData() {
  source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

 request.open('GET', '../audio/Odesza_Above_The_Middle.mp3', true);
  request.responseType = 'arraybuffer';


 request.onload = function() {
    var audioData = request.response;

   audioCtx.decodeAudioData(audioData, function(buffer) {
      source.buffer = buffer;
      console.log(buffer.length)
      console.log( buffer );
      console.log( buffer.getChannelData( 0 ) );
      var convert = new Uint8Array( buffer.getChannelData( 0 ).buffer );
      var convert2 = new Uint8Array( buffer.getChannelData( 1 ).buffer );
      console.log( convert );
      console.log( convert2 );
      temp = convert.subarray(0, 1200 );
      source.connect(audioCtx.destination);
      source.loop = true;
      //requestAnimationFrame(function() {
        console.log( 'zz' );
        svg.selectAll('rect')
          .data( convert )
          .attr('y', function(d) {
            console.log( d );
             return svgHeight - d;
          })
          .attr('height', function(d) {
             return d;
          })
          .attr('fill', function(d) {
             return 'rgb(120, 120, ' + d + ')';
          });
      //});

   },
    function(e){ console.log("Error with decoding audio data" + e.err); });

 }

 request.send();
}
getData();
  // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // var audioElement = document.getElementById('audioElement');
  // var audioSrc = audioCtx.createMediaElementSource(audioElement);
  // var analyser = audioCtx.createAnalyser();
  // var accumulatedData = new Uint8Array();
  // // Bind our analyser to the media element source.
  // audioSrc.connect(analyser);
  // audioSrc.connect(audioCtx.destination);

 //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  // var frequencyData = new Uint8Array(200);

 // var svgHeight = '300';
  // var svgWidth = '1200';
  // var barPadding = '1';

 // function createSvg(parent, height, width) {
  //   return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  // }

 // var svg = createSvg('body', svgHeight, svgWidth);

 // // Create our initial D3 chart.
  // svg.selectAll('rect')
  //    .data(frequencyData)
  //    .enter()
  //    .append('rect')
  //    .attr('x', function (d, i) {
  //       return i * (svgWidth / frequencyData.length);
  //    })
  //    .attr('width', svgWidth / frequencyData.length - barPadding);

 // // Continuously loop and update chart with frequency data.
  // function renderChart() {
  //    requestAnimationFrame(renderChart);

 //    // Copy frequency data to frequencyData array.
  //    analyser.getByteFrequencyData(frequencyData);

 //    // Update d3 chart with new data.
  //    svg.selectAll('rect')
  //       .data(frequencyData)
  //       .attr('y', function(d) {
  //          return svgHeight - d;
  //       })
  //       .attr('height', function(d) {
  //          return d;
  //       })
  //       .attr('fill', function(d) {
  //          return 'rgb(0, 0, ' + d + ')';
  //       });
  // }

 // Run the loop
  //renderChart();
});

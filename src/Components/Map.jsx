import React from 'react';

let map;

export default class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    map = new window.google.maps.Map(document.getElementById('map'),{
      zoom: 2,
      center: {lat: 30, lng: 31},
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ]
    });
    
    map.data.loadGeoJson(
      'https://www.jasonbase.com/things/yKxG.json');
    map.data.setStyle({
      fillColor: 'red',
      strokeWeight: '0'
    });
  }

  onSubmit(){
    let ctx = this;
    map.data.forEach(function(feature){
      if (feature.getProperty('Name') === ctx.state.inputValue) {
        map.data.overrideStyle(feature, {fillColor: 'green'})
      }
      })
    }

    onInputChange(e){
      this.setState({inputValue:e.target.value})
    }

  render() {
    return (
      <div className="container" style={{height: `100%`}}>
        <div className="page-header">
            <h1>Geogophers Test</h1>
        </div>
        <br></br>&nbsp;
        <input onChange={this.onInputChange} value={this.state.inputValue}></input>
        <button onClick={this.onSubmit}>Submit</button>
          <div className="maps" id="map"></div>
      </div>
    );
  }
}
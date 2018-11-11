import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { cardList, eventList, landmarkList } from './cardList.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kingdom: {
        basic: 0, intrigue: 0, seaside: 0, alchemy: 0, prosperity: 0,
        cornucopia: 0, hinterlands: 0, dark_ages: 0, guild: 0, adventures: 0, empires: 0
      },
      event: 0, landmark: 0, supplies: []
    };
  }

  onChangeKingdom = (name) => {
    return e => {
      let kingdom = Object.assign({}, this.state.kingdom);
      kingdom[name] = parseInt(e.target.value, 10);
      this.setState({ kingdom: kingdom });
    };
  }

  onChangeEvent = e => {
    this.setState({ event: parseInt(e.target.value, 10) });
  }

  onChangeLandmark = e => {
    this.setState({ landmark: parseInt(e.target.value, 10) });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Summon Kingdom Cards</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h2>王国カード</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1">
            <div>基本:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.basic} min="0" max="10" step="1" onChange={this.onChangeKingdom("basic")} />
          </div>
          <div className="col-lg-1">
            <div>陰謀:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.intrigue} min="0" max="10" step="1" onChange={this.onChangeKingdom("intrigue")} />
          </div>
          <div className="col-lg-1">
            <div>海辺:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.seaside} min="0" max="10" step="1" onChange={this.onChangeKingdom("seaside")} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1">
            <div>錬金術:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.alchemy} min="0" max="10" step="1" onChange={this.onChangeKingdom("alchemy")} />
          </div>
          <div className="col-lg-1">
            <div>繁栄:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.prosperity} min="0" max="10" step="1" onChange={this.onChangeKingdom("prosperity")} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1">
            <div>収穫祭:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.cornucopia} min="0" max="10" step="1" onChange={this.onChangeKingdom("cornucopia")} />
          </div>
          <div className="col-lg-1">
            <div>異郷:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.hinterlands} min="0" max="10" step="1" onChange={this.onChangeKingdom("hinterlands")} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1">
            <div>暗黒時代:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.dark_ages} min="0" max="10" step="1" onChange={this.onChangeKingdom("dark_ages")} />
          </div>
          <div className="col-lg-1">
            <div>ギルド:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.guild} min="0" max="10" step="1" onChange={this.onChangeKingdom("guild")} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1">
            <div>冒険:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.adventures} min="0" max="10" step="1" onChange={this.onChangeKingdom("adventures")} />
          </div>
          <div className="col-lg-1">
            <div>帝国:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.empires} min="0" max="10" step="1" onChange={this.onChangeKingdom("empires")} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h2>イベント・ランドマーク</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1">
            <div>イベント:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.event} min="0" max="10" step="1" onChange={this.onChangeEvent} />
          </div>
          <div className="col-lg-1">
            <div>帝国:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.landmark} min="0" max="10" step="1" onChange={this.onChangeLandmark} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h2>サプライ</h2>
          </div>
        </div>
        <div className="row">
        </div>
      </div>
    );
  }
}

export default App;

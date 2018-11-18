import React, { Component } from 'react';
import './App.css';
import { kingdomList, eventList, landmarkList } from './cardList.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSupplies: 0,
      kingdom: {
        basic: 0, intrigue: 0, seaside: 0, alchemy: 0, prosperity: 0,
        cornucopia: 0, hinterlands: 0, dark_ages: 0, guild: 0, adventures: 0, empires: 0
      },
      event: 0, landmark: 0, supplies: [
        {
          kingdom: {
            basic: [
              { name: "役人", bane: false }, { name: "地下貯蔵庫", bane: true },
              { name: "礼拝堂", bane: true }, { name: "議事堂", bane: false }
            ],
            intrigue: [
              { name: "男爵", bane: false }, { name: "公爵", bane: false },
              { name: "橋", bane: false }, { name: "共謀者", bane: false },
            ],
            cornucopia: [
              { name: "男爵", bane: false }
            ]
          },
          bane: { name: "手先", bane: true }, events: [{ name: "施し" }], landmarks: [{ name: "水道橋" }]
        }
      ],
      errors: ["foo", "bar"]
    };
  }

  onChangeNumberOfSupplies = e => {
    this.setState({ numberOfSupplies: parseInt(e.target.value, 10) });
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

  onGenerate = _ => {
    // validate state
    let errors = this.validateForGenerate();
    if (errors.length !== 0) {
      this.setState({ errors: errors });
      return;
    }

    let supplies = this.selectSupplies();
    this.setState({ supplies: supplies, errors : []});
  }

  validateForGenerate() {
    let errors = [];
    let kingdom = this.state.kingdom;
    let numberOfSupplies = this.state.numberOfSupplies;

    if (Object.values(kingdom).reduce((acc, x) => acc + x) !== 10) {
      errors.push("王国カードの数が10ではありません");
    }

    Object.entries(kingdom).forEach(kv => {
      let [name, num] = kv;

      if (num * numberOfSupplies > kingdomList[name].length) {
        errors.push(`${name}のカード枚数が足りません`)
      }
    })

    if (this.state.event * numberOfSupplies > eventList.length) {
      errors.push("イベントの枚数が足りません");
    }

    if (this.state.landmark * numberOfSupplies > landmarkList.length) {
      errors.push("ランドマークの枚数が足りません");
    }

    return errors;
  }

  selectSupplies() {
    let supplies = [];
    let numberOfSupplies = this.state.numberOfSupplies

    for (let i = 0; i < numberOfSupplies; i++) {
      supplies.push({ kingdom: {}, events: [], landmarks: [] });
    }

    Object.entries(this.state.kingdom).forEach(kv => {
      let [name, num] = kv;

      if (num < 1) {
        return;
      }

      let cards = this.shuffleArray(kingdomList[name]);
      for (let i = 0; i < numberOfSupplies; i++) {
        supplies[i].kingdom[name] = cards.slice(i * num, (i + 1) * num);
      }
    });

    let event = this.state.event;
    if (event >= 1) {
      let events = this.shuffleArray(eventList);
      for (let i = 0; i < numberOfSupplies; i++) {
        supplies[i].events = events.slice(i * event, (i + 1) * event);
      }
    }

    let landmark = this.state.landmark;
    if (landmark >= 1) {
      let landmarks = this.shuffleArray(landmarkList);
      for (let i = 0; i < numberOfSupplies; i++) {
        supplies[i].landmarks = landmarks.slice(i * landmark, (i + 1) * landmark);
      }
    }

    return supplies;
  }

  shuffleArray(ary) {
    let copied = ary.slice();
    for (let i = copied.length - 1; i>= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
  }

  render() {
    let errors = '';
    if (this.state.errors.length !== 0) {
      let messages = this.state.errors.map((error, i) => <div key={i}>{error}</div>)
      errors = <div className="alert alert-danger">
        {messages}
      </div>;
    }
    let supplies = this.state.supplies.map((supply, i) => {
      let cards = Object.keys(supply.kingdom).map(ex => supply.kingdom[ex].map(card => card.name).join(' ')).join(' ');
      let bane = typeof supply.bane === 'object' ? `災い: ${supply.bane.name}` : '';
      let landscapes = supply.events.concat(supply.landmarks).map(card => card.name).join(' ')

      return (
        <div className="panel panel-default" key={i}>
          <div className="panel-body">
            <div>{cards}</div>
            <div>{landscapes}</div>
            <div>{bane}</div>
          </div>
        </div>
      )
    })
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
          <div className="col-lg-1">
            <div>数:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.numberOfSupplies} min="0" max="10" step="1" onChange={this.onChangeNumberOfSupplies} />
          </div>
          <div className="col-lg-2">
            <button type="button" className="btn btn-info btn" onClick={this.onGenerate}>生成</button>
          </div>
        </div>
        <div className="row" id="errors">
          <div className="col-lg-12">
            {errors}
          </div>
        </div>
        <div className="row" id="supplies">
          <div className="col-lg-12">
            {supplies}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

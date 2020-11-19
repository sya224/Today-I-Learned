import React, { Component } from "react";
import { PhotoshopPicker } from 'react-color';
import reactCSS from 'reactcss'
import { CompactPicker } from 'react-color'
import "./color.css"
import Dialog from '@material-ui/core/Dialog';
import PaletteIcon from '@material-ui/icons/Palette';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: {
        "hex": this.props.value
      },
      displayColorPicker: false,
    }

    this.handleReset = this.handleReset.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick = () => {
    this.setState({
      color: {
        "hex" : this.props.value
      }
    })
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };
  handleReset() {
    this.props.handleChangeColor(this.state.color);
    this.handleClose();
  }
  handleClose() {
    this.setState({
      displayColorPicker: false
    })
  }
  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '36px',
          borderRadius: '2px',
          background: `${this.props.value}`,
          backgroundClip: 'content-box',
          padding: '1px',
          border: '1px solid gray'
        },
        icon: {
          width: '36px',
          height: '36px',
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          display: 'inline-block',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          marginLeft: '226px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <>
        <div style={{ display: 'flex', width: `100%` }} className="container">
          <div style={styles.swatch} >
            <div style={styles.color} />
            <label>색</label>
          </div>
          <CompactPicker onChange={this.props.handleChangeColor} onSwatchHover={this.swatchHoverHandler}></CompactPicker>
          <div onClick={this.handleClick} className="selectColor">
            <PaletteIcon style={styles.icon} color="primary"></PaletteIcon>
            <br/>
            <label>팔레트</label>
          </div>
          <Dialog aria-labelledby="simple-dialog-title" open={this.state.displayColorPicker}>
            <div id="photoshop" style={{ position: "relative"}}>
              <PhotoshopPicker
                onChange={this.props.handleChangeColor}
                color={this.props.value}
                onAccept={this.handleClose}
                onCancel={this.handleReset}
                header="Select Color"
              />
            </div>
          </Dialog>
        </div>
      </>
    )
  }
}

import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';

export default class ColorPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPicker: false,
            color: this.props.color ? this.props.color : '#FFF',
        };
    }

    handleClick = () => {
        this.setState({ showPicker: !this.state.showPicker})
    };

    handleClose = () => {
        this.setState({ showPicker: false })
    };

    colorChange = (newColor) => {
        var hexcolor = newColor.hex + ((Math.floor(Number(newColor.rgb.a)*256)).toString(16));
        this.props.onChange(hexcolor);
        this.setState({color: hexcolor});
    }

    render(){
        var styles = reactCSS({
            'default': {
              color: {
                width: '15px',
                height: '15px',
                borderRadius: '.5px',
                background: this.state.color,
              },
              swatch: {
                padding: '0px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
                margin: '1px',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
              main: {
                  display: 'inline-block'
              }
            },
          });
        return(
            <div style={styles.main}>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.showPicker ? 
                <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <ChromePicker 
                        color={this.state.color} 
                        onChangeComplete={this.colorChange}
                        disableAlpha={false}
                    />
                </div> : null }
            </div>
        );
    }
}
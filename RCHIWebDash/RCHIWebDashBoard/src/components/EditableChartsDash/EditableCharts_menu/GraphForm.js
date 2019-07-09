import React from 'react';

export default class GraphForm extends React.Component {
    state = { 
        GraphTitle: '',
        GraphType: '',
        Data:''
    };

    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value}, this.props.rowIDX ,Number(this.props.graphIDX));
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
    //     //this.props.onSubmit(this.state);
    //     this.setState({
    //         GraphTitle: '',
    //     });
    //     this.props.onChange({
    //         GraphTitle: '',
    //     });
    };
    render (){
        return (
            <div>
                <p>{"Row " + this.props.rowIDX + " Graph " + this.props.graphIDX + "      "}
                </p>
                
                <form className="form">
                    <input placeholder='Graph Title'
                    name="GraphTitle" 
                    value={this.state.GraphTitle}
                    onChange={e => this.change(e) }
                    /> 
                    <input placeholder='Graph Type: Bar or Line'
                    name="GraphType" 
                    value={this.state.GraphType}
                    onChange={e => this.change(e) }
                    /> 
                    <input placeholder='Data 1 - 6'
                    name="Data" 
                    value={this.state.Data}
                    onChange={e => this.change(e) }
                    /> 
                </form>
                <button
                    type="button"
                    onClick={() => this.props.handleRemoveChart(this.props.rowIDX,this.props.graphIDX)}
                    className="small"
                >
                    Remove Chart
                </button>
            </div>
        );
    }

}
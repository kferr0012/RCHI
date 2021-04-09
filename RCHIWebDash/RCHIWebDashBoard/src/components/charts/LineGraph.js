import React from 'react';
import { ResponsiveLine } from '@nivo/line'

import { colors } from '../Utilities/styling/colors';

export default class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      tickValues: this.props.tickValues,
      gridYValues: this.props.gridYValues,
      max: this.props.max,
      categories: this.props.categories
    }
  }
  
  componentDidMount = async event => {
    // TODO: replace static data with API call to backend..upload data in a table as an API reference
    // gets total data from each year
    let graphData = [];
    if (this.state.categories.includes("volunteers")) {
      graphData.push({
        'id': "Volunteers",
        'data': [
          {
            'x': "2016",
            'y': "503"
          },
          {
            'x': "2017",
            'y': "498"
          },
          {
            'x': "2018",
            'y': "486"
          },
          {
            'x': "2019",
            'y': "745"
          },
          {
            'x': "2020",
            'y': "842"
          },
        ]
      })
    }

    if (this.state.categories.includes("sheltered")) {
      graphData.push({
        'id': "Sheltered",
        'data': [
          // {
          //   'x': "2015",
          //   'y': "880"
          // },
          {
            'x': "2016",
            'y': "814"
          },
          {
            'x': "2017",
            'y': "768"
          },
          {
            'x': "2018",
            'y': "631"
          },
          {
            'x': "2019",
            'y': "766"
          },
          {
            'x': "2020",
            'y': "729"
          },
        ]
      })
    }
      
    if (this.state.categories.includes("unsheltered")) {
      graphData.push({
        'id': "Unsheltered",
        'data': [
          // {
          //   'x': "2015",
          //   'y': "1587"
          // },
          {
            'x': "2016",
            'y': "1351"
          },
          {
            'x': "2017",
            'y': "1638"
          },
          {
            'x': "2018",
            'y': "1685"
          },
          {
            'x': "2019",
            'y': "2045"
          },
          {
            'x': "2020",
            'y': "2155"
          },

        ]
      }
    )
    }
    
    this.setState({data: graphData});
  }


  render() {
    return (
      // TODO: make div size responsive to the page dimensions
      // <div style={{maxHeight: "100%", minHeight: "100%"}}>
      <div style = {{height: '100%', width: '100%', position:'absolute'}}>
        <ResponsiveLine
          data={this.state.data}
          margin={this.props.margin ? this.props.margin : { top: 0, right: 30, bottom: 70, left: 40}}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', stacked: true, min: 0, max: this.state.max }}
          enableSlices = "x"
          sliceTooltip={({ slice }) => {
            return (
                <div
                    style={{
                        background: 'white',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                    }}
                >
                    <div><strong>Year:</strong> {slice.points[0].data.x}</div>
                    {slice.points.map(point => (
                        <div
                            key={point.id}
                            style={{
                                color: point.serieColor,
                                padding: '3px 0',
                            }}
                        >
                            <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                        </div>
                    ))}
                </div>
            )}}
          axisTop={null}
          axisRight={null}
          gridYValues={this.state.gridYValues}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
 
          axisLeft={null}
          colors={ colors[7] }
          lineWidth={2}
          pointSize={5}
          enablePointLabel={true}
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.65}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 50,
                  itemsSpacing: 15,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
        />
      </div>
    );
  }
}
import React, { Component } from 'react';
import { Menu, Segment, Responsive, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

// How it was in the 2019 dashboards
// const links = [
//   { name: 'General Table',                link: '/GeneralTable' },
//   { name: 'Unsheltered vs Sheltered',     link: '/UnshelteredvsSheltered' },
//   { name: 'Supervisorial Districts',      link: '/SupervisorialDistricts' },
//   { name: 'Unsheltered Trends',           link: '/UnshelteredTrends' },
//   { name: 'CityBreakdown',               link: '/CityBreakdown' },
//   { name: 'divider'},
//   { name: 'Newly Homeless',               link: '/NewlyHomeless' },
//   { name: 'Map',                          link: '/' },
// ]

// TO ADD A LINK JUST A NAME AND LINK IN LINKS OBJECT
const links = [
  { name: 'General Dashboard',                link: '/' },
  { name: 'Unsheltered vs Sheltered',     link: '/UnshelteredvsSheltered' },
  { name: 'Newly Homeless',               link: '/NewlyHomeless' },
  { name: 'Unsheltered Trends',           link: '/UnshelteredTrends' },
  { name: 'Supervisorial Districts',      link: '/SupervisorialDistricts' },
  { name: 'City Breakdown',                link: '/CityBreakdown' },
  { name: 'City Table',                   link:  '/CityTables'},
  { name: 'Map',                          link: '/Map' },
  // { name: 'divider'},
]

class Header extends React.Component{

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getActiveItem = () => {
    for ( var i in links){
      if (this.props.location.pathname == links[i].link){
        return links[i].name;
      } 
    }
    return 'Map';
  }

  state = { activeItem: this.getActiveItem() };

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <a id="title-highlight">RCHI<span id="title">Riverside County Health Informatics</span></a>  
        <Segment.Group id="segment">
          <Responsive as={Segment} minWidth={1320}>
            <Menu pointing secondary >
              {
                links.map( (i, idx) => {
                  if ( i.name !== 'divider')
                    return (
                      <Menu.Item
                        name = {i.name}
                        active = {activeItem === i.name}
                        onClick = {this.handleItemClick}
                        as = {Link} 
                        to = {i.link}
                      />
                    );
                })
              }
            </Menu>
          </Responsive>
          <Responsive as={Segment} maxWidth={1319}>
          <Dropdown text="browse" id="hamburger">
              <Dropdown.Menu>
                {
                  links.map( (i, idx) => {
                    if (i.name === 'divider')
                      return ( <Dropdown.Divider /> );
                    else
                      return (
                        <Dropdown.Item 
                          name = {i.name} 
                          as = {Link} 
                          to = {i.link} 
                          text = {i.name}  
                          active={activeItem === i.name}
                          onClick={this.handleItemClick}
                        />
                      );
                  })
                }
              </Dropdown.Menu>
            </Dropdown> 
          </Responsive>
        </Segment.Group>
      </div>
    )
  }
}

export default withRouter(Header);
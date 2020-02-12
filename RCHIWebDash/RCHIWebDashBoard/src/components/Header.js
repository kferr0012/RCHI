import React, { Component } from 'react';
import { Menu, Segment, Responsive, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

// TO ADD A LINK JUST A NAME AND LINK IN LINKS OBJECT
const links = [
  { name: 'Map',                          link: '/' },
  { name: 'Supervisorial Districts',      link: '/SupervisorialDistricts' },

  { name: 'divider'},

  { name: 'City Dashboards',              link: '/CityDashboard' },
  { name: 'Unsheltered Trends',           link: '/UnshelteredTrends' },
  { name: 'General Table',                link: '/GeneralTable' },
  { name: 'City Table',                   link: '/CityTables' },
  { name: '/CityBreakdown',               link: '/CityBreakdown' },
  { name: 'Unsheltered vs Sheltered',     link: '/UnshelteredvsSheltered' },
  
  { name: 'divider'},

  { name: 'DIY Chart',                    link: '/DIYChart' },
  { name: 'Sandbox',                      link: '/Sandbox' },
  { name: 'Newly Homeless',               link: '/NewlyHomeless' },
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
          <Responsive as={Segment} minWidth={1206}>
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
          <Responsive as={Segment} maxWidth={1205}>
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
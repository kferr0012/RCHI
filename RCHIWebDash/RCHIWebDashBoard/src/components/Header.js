import React, { Component } from 'react';
import { Menu, Segment, Responsive, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';


class Header extends React.Component{
 
  state = { activeItem: "Map" }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    if ((this.props.location.pathname) === "/"){
      this.state = { activeItem: 'Map' };
    }
    if ((this.props.location.pathname) === "/SupervisorialDistricts"){
      this.state = { activeItem: 'Supervisorial Districts' };
    }
    else if ((this.props.location.pathname) === "/CityDashboard"){
      this.state = { activeItem: 'City Dashboards' };
    }
     else if ((this.props.location.pathname) === "/UnshelteredTrends"){
      this.state = { activeItem: 'Unsheltered Trends' };
    }
    else if ((this.props.location.pathname) === "/GeneralTable"){
      this.state = { activeItem: 'General Table' };
    }
    else if ((this.props.location.pathname) === "/CityTables"){
      this.state = { activeItem: 'City Table' };
    }
    else if ((this.props.location.pathname) === "/CityBreakdown"){
      this.state = { activeItem: 'City Breakdown Table' };
    }
    else if ((this.props.location.pathname) === "/UnshelteredvsSheltered"){
      this.state = { activeItem: 'Unsheltered vs Sheltered' };
    }
    else if ((this.props.location.pathname) === "/DIYChart"){
      this.state = { activeItem: 'DIY Chart' };
    }
    else if ((this.props.location.pathname) === "/Sandbox"){
      this.state = { activeItem: 'Sandbox' };
    }
      
    const { activeItem } = this.state
    return (
      
      <div>
      <a id="title-highlight">RCHI<span id="title">Riverside County Health Informatics</span></a>  
      <Segment.Group id="segment">
        <Responsive as={Segment} minWidth={1206}>
        <Menu pointing secondary >
          <Menu.Item
            name="Map"
            active={activeItem === "Map"}
            onClick={this.handleItemClick}
            as={Link} to ="/"
          />
          <Menu.Item
            name="Supervisorial Districts"
            active={activeItem === "Supervisorial Districts"}
            onClick={this.handleItemClick}
            as={Link} to ="/SupervisorialDistricts"
          />
          <Menu.Item
            name="City Dashboards"
            active={activeItem === "City Dashboards"}
            onClick={this.handleItemClick}
            as={Link} to ='/CityDashboard'
          />
          <Menu.Item
            name="Unsheltered Trends"
            active={activeItem === "Unsheltered Trends"}
            onClick={this.handleItemClick}
            as={Link} to ='/UnshelteredTrends'
          />
          <Menu.Item
            name="General Table"
            active={activeItem === "General Table"}
            onClick={this.handleItemClick}
            as={Link} to ='/GeneralTable'
          />
          <Menu.Item
            name="City Table"
            active={activeItem === "City Table"}
            onClick={this.handleItemClick}
            as={Link} to ='/CityTables'
          />
          <Menu.Item
            name="City Breakdown Table"
            active={activeItem === "City Breakdown Table"}
            onClick={this.handleItemClick}
            as={Link} to ='/CityBreakdown'
          />
          <Menu.Item
            name="Unsheltered vs Sheltered"
            active={activeItem === "Unsheltered vs Sheltered"}
            onClick={this.handleItemClick}
            as={Link} to ='/UnshelteredvsSheltered'
          />
          <Menu.Item
            name="DIY Chart"
            active={activeItem === "DIY Chart"}
            onClick={this.handleItemClick}
            as={Link} to ='/DIYChart'
          />
          <Menu.Item
            name="Sandbox"
            active={activeItem === "Sandbox"}
            onClick={this.handleItemClick}
            as={Link} to ='/Sandbox'
          />
        </Menu>
        </Responsive>

         
        <Responsive as={Segment} maxWidth={1205}>
         <Dropdown text="browse" id="hamburger">
            <Dropdown.Menu>
                <Dropdown.Item name="Map" as={Link} to ="/" text='Map' active={activeItem === "Map"}
            onClick={this.handleItemClick}/>
                <Dropdown.Item name="Supervisorial Districts" text='Supervisorial Districts' as={Link} to ='/SupervisorialDistricts' active={activeItem === "Supervisorial Districts"}
            onClick={this.handleItemClick} />
                <Dropdown.Divider />
                <Dropdown.Item name="City Dashboards" text='City Dashboards' as={Link} to ='/CityDashboard' active={activeItem === "City Dashboards"}
            onClick={this.handleItemClick}/>
                <Dropdown.Item text='Unsheltered Trends' name="Unsheltered Trends" as={Link} to ='/UnshelteredTrends'  active={activeItem === "Unsheltered Trends"}
            onClick={this.handleItemClick}/>
                <Dropdown.Divider />
                <Dropdown.Item text='General Table' name="General Table" as={Link} to ='/GeneralTable' active={activeItem === "General Table"}
            onClick={this.handleItemClick}/>
                <Dropdown.Item text='City Table' name="City Table" as={Link} to ='/CityTables'  active={activeItem === "City Table"}
            onClick={this.handleItemClick}/>
                <Dropdown.Item text='City Breakdown Table' name="City Breakdown Table" as={Link} to ='/CityBreakdown' active={activeItem === "City Breakdown Table"}
            onClick={this.handleItemClick}>
                </Dropdown.Item>
                <Dropdown.Item text='Unsheltered vs Sheltered' name="Unsheltered vs Sheltered" as={Link} to ='/UnshelteredvsSheltered'   active={activeItem === "Unsheltered vs Sheltered"}
            onClick={this.handleItemClick}/>
                <Dropdown.Divider />
                <Dropdown.Item text='DIY Chart' name="DIY Chart" as={Link} to ='/DIYChart' active={activeItem === "DIY Chart"}
            onClick={this.handleItemClick}/>
                <Dropdown.Item text='Sandbox' name="Sandbox" as={Link} to ='/Sandbox' active={activeItem === "Sandbox"}
            onClick={this.handleItemClick}/>
            </Dropdown.Menu>
        </Dropdown> 
        </Responsive>
      </Segment.Group>
       
      </div>
    
    )
  }
}

export default withRouter(Header);
# Instructions

## Bash Script (Automated)

1) pull repo
2) `cd RCHI`
3) `./setup.sh`

If, in any case, that this doesn't work or fails, try "Manual" Instruction below

## Manual

### Setup Django

  #### Pre- Requirements

  python3 version `^3.5` and pip3 must be installed: 
  - `sudo apt-get install python3 pip3`


  #### Installation
  Optional: Setup a Virtual Enviroment pipenv or virtualenv

  Install Django
    - `pip3 install --user Django`
  Add dependencies:
    - djangorestframework: `pip3 install --user djangorestframework`
    - django-filter: `pip3 install --user django-filter`
    - django-cors-headers: `pip3 install --user django-cors-headers`

#### Setup Django
  - `cd RCHI/RCHIWebDash`
  - `python3 manage.py makemigrations`
  - `python3 manage.py migrate`
  - `python3 manage.py loaddata backend/fixtures/*`

### Setup React

2) `cd RCHI/RCHIWebDash/RCHIWebDashBoard`
3) `npm install`:

If in anycase that `npm install` failed, here are the following packages that are a part of RCHI: 
  - "@nivo/bar": "^0.59.2",
  - "@nivo/line": "^0.59.3",
  - "@nivo/pie": "^0.59.1",
  - "apexcharts": "^3.6.7",
  - "axios": "^0.19.0",
  - "chart.js": "^2.8.0",
  - "formsy-react": "^1.1.5",
  - "jquery": "^3.4.1",
  - "leaflet": "^1.5.1",
  - "react": "^16.8.6",
  - "react-apexcharts": "^1.3.3",
  - "react-bootstrap": "^1.0.0-beta.14",
  - "react-chartjs-2": "^2.7.6",
  - "react-color": "^2.17.3",
  - "react-dom": "^16.8.6",
  - "react-leaflet": "^2.2.1",
  - "react-router-dom": "^4.3.1",
  - "react-scripts": "^3.1.0",
  - "react-select": "^2.4.3",
  -  "reactcss": "^1.2.3",
  -  "semantic-ui-react": "^0.87.3",
  -  "typescript": "^3.5.3"

npm start
Page should open on localhost:3000

# Running the Web Platform

We need *2* Terminals - 1 Django server (for datase fetching) and 1 React web layout

#### run Django

  - `cd RCHI/RCHIWebDash`
  - `python3 manage.py runserver`

#### run React

  - `cd RCHI/RCHIWebDash/RCHIWebDashBoard`
  - `npm start`

# FrameWork of FrontEnd
Two Main Folders
1)containers (Contain Page Main Layout) and are in the directory: `cd RCHI/RCHIWebDash/RCHIWebDashBoard/src`
  - `Unsheltered Supervisory Districts`
  - `Unsheltered Trends`
  - `components/Utilities` - function JS Files, Graphs, Tools)
2)components (Function JS Files)
  - Utilities
    * Graphs
    * Tools
  - Unsheltered Superviosry Districts
  - Unsheltered Trend Page


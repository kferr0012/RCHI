# Commands to Run 

# Setting Up Backend (Terminal 1)

```bash
Setup a Virtual Enviroment
pipenv or virtualenv
Add dependencies
  - djangorestframework
  - django-filter
  - django-cors-headers
```

```bash
Setup Data in BackEnd 
1)Install Django
2)cd RCHIWebDash
3) Setup Tables in database
  - python3 manage.py makemigrations
  - python3 manage.py migrate
4) Load Data into database
  - python3 manage loaddata backend/fixtures/*
5)Runserver
  - python3 manage runserver
 Backend can be viewed at localhost:8000
```

# Setting Up FrontEnd (Terminal 2)
```bash
Setup for FrontEnd
1)Install React
2)Add dependencies (npm / yard)
  - @nivo/bar, @nivo/pie, @nivo/line
  - semantic-ui-react
cd RCHIWebDashBoard
npm start
Page should open on localhost:3000
```

# FrameWork of FrontEnd
```bash
Two Main Folders
1)containers (Contain Page Main Layout)
  - Unsheltered Supervisory Districts
  - Unsheltered Trends
  - etc..
2)components (Function JS Files)
  - Utilities
    * Graphs
    * Tools
  - Unsheltered Superviosry Districts
  - Unsheltered Trend Page
```

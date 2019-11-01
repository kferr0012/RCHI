#!/bin/sh



echo "setting up Django"


echo "===== installing python 3 and pip3 ====="
sudo apt-get install python3 python3-pip

pip3 install --user Django
pip3 install --user djangorestframework
pip3 install --user django-filter
pip3 install --user django-cors-headers


echo "===== installing React Tools ====="

cd RCHI/RCHIWebDash/RCHIWebDashBoard
npm install

cd ../..

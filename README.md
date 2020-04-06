# Visual Transportation Support System

## What?
A data-driven and browser-based application to visualize, understand and plan for city transportation in the Gothenburg region.

<img src="./readme_files/interactive_mode.gif" width="500"> <br>
*Transportation routes based on <a href="https://github.com/vasttrafik/open-data-gtfs">GTFS-data from Västtrafik*

## Why?
To help city planners gain insights about the potential improvements of public transportation, based on travel requests.

## How?
The visualiser recieves real-time travel requests over the MQTT-protocol..</a>

<img src="./readme_files/data_driven_mode.gif" width="500"><br>
*Travel requests with origin- and destinationpoint received in real time*

## Technologies used
*  MapBox
*  Node.js
*  MQTT with Mosquitto broker

Developed as distributed system as part of *DIT-355 Mini Project : Distributed Systems Development* at Software Engineering and Management, Gothenburg University 2019 - 2020.

## Developers
* Emanuel Dellsén
* Hannes Ringblom
* Adam Klevfors
* Niklas Möller
* Karl Westgårdh

##Software Architecture
<img src="./documentation--group-5/SAD/ComponentDiagramConceptual.png" width="500"><br>
<br>
<img src="./documentation--group-5/SAD/DeploymentDiagram.png" width="500"><br>


## Setup and running

### Dependencies
1. Node.js & Npm (https://nodejs.org/en/download/)
2. Git (https://git-scm.com/downloads)

### Setup
1. Install Broker - Mosquitto (https://mosquitto.org/download/) - Use latest version
2. Go to Mosquitto directory
3. Open mosquitto.conf file - You may have to open as administrator
4. Add the following lines to the file below "Default Listeners":
   - listener 9001
   - protocol websockets

5. The components (Visualiser, Validator, TravelRequestProvider, TopicGenerator and Pipe) can all be setup with command npm init


### Running
Make sure you are running on your computer(s) on a network that is capable to handle communication over ip-addresses and that your firewall is turned off (if needed)

1. Run Mosquitto
   - On Windows: go to Mosquitto root directory.
   - Open terminal (in adminstration mode)
   - Start Mosquitto by running "mosquitto -v -c mosquitto.conf" in the terminal (see below for eventual errors)
   - On Mac: Open terminal
   - Start Mosquitto by running "/usr/local/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf" in the terminal
2. Get ip-address of broker
   - On Windows: Open terminal and run "ipconfig". Note the ipv4-address.
   - On Mac: [Find ip-address on mac](https://www.wikihow.com/Find-Your-IP-Address-on-a-Mac)
   - Add the "application_keys.js" (from documentation repo root directory) file to the directory one level above the application repositories (step 5 to 8 in section on setup)
   - Add the value of the ip-address, port and MapBox public key to the "application_keys.js" file   
3. Run each component with Node.js using the command:  node index.js
4. You should now be able to see some data being presented on the map.

## Errors for Mosquitto
If there are problems using websockets while trying to run Mosquitto with specific configuration do the following:
1. Open any terminal as administrator on the computer running the broker
2. run: netstat -ano | findstr "9001"
3. Note what number is presented after "listening"
4. run: taskkill /F /PID **** {number is presented after "listening"}
5. Now you should be able to restart the Mosquitto with the command presented above

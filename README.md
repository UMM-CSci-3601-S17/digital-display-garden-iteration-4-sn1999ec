# Digital Display Garden
[![Build Status](https://travis-ci.org/UMM-CSci-3601-S17/digital-display-garden-iteration-4-sn1999ec.svg?branch=master)](https://travis-ci.org/UMM-CSci-3601-S17/digital-display-garden-iteration-4-sn1999ec)
Software Design S2017, Iteration 4, Team _SN1999ec_ 

This repository is a fork from [Iteration 3, Team Manassas][manassas], which is a fork from [Iteration 2, Team _Grimaldi_][grimaldi], which is a fork from [Iteration 1 , Team _Claude Arabo_][claude-arabo].

## Description
The [West Central Research and Outreach Center][wcroc] wanted to have a system in place where visitors to the Flower Gardens could rate plants via their phones.
 The Digital Display Garden allows visitors to scan a QR code, select a plant, and like/dislike and leave a comment on the plant. 
 Visitors can also search for a plant by common name or cultivar name and receive a list of plants matching the description, and the beds those plants can be found in. Clicking on a plant in this list will take them to the plant's page. 
 
 WCROC administrators are able to import a spreadsheet of the plants and related information, update the spreadsheet without losing data, download QR codes for each bed, 
 view graphs of the collected data (including which beds and plants get the most ratings), and download the collected data as a spreadsheet. 
 
 The admin side is protected via a password, which is hard-coded at the moment. We advise changing the password as soon as it is deployed. 

## Tools and Languages Used

* Typescript for front-end
* Java for back-end
* MongoDB
* Bootstrap
* Karma/Jasmine for testing front-end
* JUnit for testing back-end
* Gradle

## Setup

Cloning the project inside IntelliJ:

- When prompted to create a new IntelliJ project, select **yes**.
- Select **import project from existing model** and select **Gradle.**
  - Make sure **Use default Gradle wrapper** is selected.
- Click **Finish.**

:fire: If IntelliJ ever prompts you to compile typescript files into
javascript **say no!**. Doing this will confuse webpack and break the client
side of your project during build. No permanent damage will be done, but it's
pretty annoying to deal with.

When you load the project on a new machine, tell Gradle to Refresh linked Gradle projects.


## Finished By SN1999ec
* Click Plant from Search Page
* Password Protection
* HTTPS
* Graphs
* Sorting Plants on Search Page

## Finished by Manassas
* Update Database with new spreadsheet
* Search garden by Cultivar or Common Name
* Show comment count
* Rating and Commenting


## Documentation
* [Excel File Requirements](Documentation/ExcelFileRequirements.md)  
* [Excel Parser Documentation](Documentation/ExcelParser.md) 
* [Build Instructions](Documentation/buildAndLaunchInstructions.md)


## Resources

- [Bootstrap Components][bootstrap]
- [Mongo's Java Drivers (Mongo JDBC)][mongo-jdbc]
- [What _is_ Angular 2... why TypeScript?][angular-2]
- [What _is_ webpack...?][whats-webpack]
- [Testing Angular 2 with Karma/Jasmine][angular2-karma-jasmine]

[angular-2]: https://www.infoq.com/articles/Angular2-TypeScript-High-Level-Overview
[angular2-karma-jasmine]: http://twofuckingdevelopers.com/2016/01/testing-angular-2-with-karma-and-jasmine/
[labtasks]: LABTASKS.md
[travis]: https://travis-ci.org/
[whats-webpack]: https://webpack.github.io/docs/what-is-webpack.html
[bootstrap]: https://getbootstrap.com/components/ 
[mongo-jdbc]: https://docs.mongodb.com/ecosystem/drivers/java/ 
[grimaldi]: https://github.com/UMM-CSci-3601-S17/digital-display-garden-iteration-2-grimaldi
[claude-arabo]: https://github.com/UMM-CSci-3601-S17/digital-display-garden-iteration-1-claudearabo
[manassas]: https://github.com/UMM-CSci-3601-S17/digital-display-garden-iteration-3-manasses
[wcroc]: https://wcroc.cfans.umn.edu/
---
layout: BlogDetail
sidebar: false
title: Generative Pages with AI code tools
subtitle: Breadcrumbs in Canvas apps
description: In this article, I’ll show you how to create breadcrumbs using out-of-the-box Power Apps features to help your users navigate through the app.
image: /images/blog/power-automate-flows.jpg
status: concept
date: 2026-03-01
tags: Power Apps
author: ARJAN RIJSDIJK
---


<!-- 


# Notes

# Subjects

* Github Copilot CLI
* PAC CLI (preview model commands)
* Created tests
* .copilot / plugins (write about the instructions, the best practice)


# Demo structure

1. Install Github Copilot
2. Create a genpage, based on Accounts table
3. Publish a Gen page
4. Create gen page from naturual language in MDA
5. Edit using Copilot CLI
6. See result

7. PAC CLI preview (neccesary stuf), but also in preview)
8. plugins (write about the instructions, the best practice)
9. Good to know:
    * Gemaakte genpages niet terug te vinden in solution
    * Je aangemaakt genpage is dus nog geen page (zoals we dat gewend zijn vanuit custom pages)
    * Er zijn solution afhankelijkheden, denk aan de eerste keer exporteren. Afhankelijkheden inzichtelijk maken


# Trefwoorden voor post/blog

> Eindelijk kent copilot nu het platform 
> Preview 
> Only US English


# Message



-->





In dit blog leg ik uit hoe je met gebruik Copilot CLI een generative page kunt maken of wijzigen en deze kiunt uploaden (of downloaden) naar je IDE. In dit voorbeeld maak ik gebruik van Visual Studio Code als IDE. Uiteraard kun je je eigen IDE kiezen. De documentatie van Microsoft beperkt zich op dit moment tot Visual Studio Code en Claude Code. 


# Preperation



## Copilot CLI 

Voor we met Copilot CLI starten moeten we deze eerst installeren. Meer informatie over installatie en opties kun je vinden via [Install Copilot CLI](https://github.com/features/copilot/cli/).

Open een terminal window in Visual Studio Code en geef het volgende commando in

```
npm install -g @github/copilot
```


## Power Platform Plugin



https://github.com/microsoft/power-platform-skills/tree/main/plugins/model-apps


## Authenticate and select environment

## Model driven app






# Create a generative page

## Create a page


Open je terminal en start Copilot via je terminal met het volgende commando

```
copilot
```

Als Copilot is gestart moeten we de genpage skill starten (dit is een onderdeel van de eerder geinstalleerde plugin). Ga naar je temrinal en geef het volgende commande in. 

```
/model-apps:genpage
```

[Screenshot met zoeken en selecteren van commando]

De skill zal je nu een aantal vragen stellen. Een van de vragen is 



### Prompt

```
Build a page showing Lego Sets records as a gallery of cards using modern look & feel. All cards should have fixed size and tall enough to fit 3 lines of titles. Include name, image url (as image) on the top, year and parts. 
Make the component fill 100% of the space. Make the gallery scrollable. Use data from the Lego Sets table. Make each card clickable to open the Lego Sets record in a new window. The target URL should be current location path with following query string parameters: pagetype=entityrecord&etn=[entityname]&id=[recordid] where entityname is rsdk_legosets and id is rsdk_LegoSetsId. 
Add a search option to search all lego sets on a given keyword.
```




## Uplod a page

## See the results


# Create agenerative page ifrom your model-driven app

## Use Copilot CLI to make changes

## Upload changes

## See the result

Note: you can;t add changes to uploaded pages via naturual language directly from your model-driven app








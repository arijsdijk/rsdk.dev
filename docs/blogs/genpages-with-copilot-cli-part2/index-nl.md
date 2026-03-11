---
layout: BlogDetail
sidebar: false
title: Generative Pages with AI code tools - Part 2
subtitle: genpages with copilot cli (2)
description: In this article...
image: /assets/banner.png
status: published
date: 2026-03-12
tags: Power Apps, Copilot
author: ARJAN RIJSDIJK
---


Onlangs publiceerde ik een artikel over het genereren van generative pages met GitHub Copilot CLI en de Power Platform skills plugin. Heb je hem gemist? Je kunt hem hier terugvinden: [Generative pages with GitHub Copilot CLI](https://arjanrijsdijk.com/blogs/genpages-with-copilot-cli/)

In mijn vorige artikel heb ik vooral stilgestaan bij het maken van een nieuwe pagina met behulp van GitHub Copilot CLI in Visual Studio code en het uploaden van deze nieuwe pagina naar een model-driven app.

In dit artikel gaan we het omdraaien, we maken nu eerst een nieuwe generative pages aan via de in-app designer om de pagina vervolgens verder te bewerken in Visual Studio code en dat allemaal met behulp van GitHub Copilot CLI. 


## What’s the plan?

Het plan is om op basis van een tabel met Lego Minifigs een pagina te maken met cards, in deze cards staat een foto, een naam en het aantal onderdelen dat de minifig bevat. 

Ik maak gebruik van de volgende Dataverse tabel.

![Dataverse Minifig table](./assets/0-dataverse-minifigs.png)

Op basis van de tabel gaan we het volgende doen;

1. Describe a new generative page directly in a model-driven app
2. Download the page to a local IDE (Visual Studio Code)
3. Make changes to the page
4. Upload (deploy) the page back to Power Apps



## Preparation

Alvorens we alle stappen van dit artikel kunnen uitvoeren moeten we een aantal voorbereidingen doen, zoals;

* Install GitHub Copilot CLI [read more](https://github.com/features/copilot/cli/)
* Get Power Platform Skills plugin [read more](https://github.com/microsoft/power-platform-skills/tree/main)
* Authenticate and select environment
* Create a model-driven app

In het eerste deel van mijn blog over generative pages met GitHub Copilot CLI kun je meer lezen over de benodigde voorbereidingen. Meer informatie kun je [hier](https://arjanrijsdijk.com/blogs/genpages-with-copilot-cli/#preparation) vinden.





## Create a generative page


Als eerste gaan we aan de slag met het maken van een generative page in de model-driven app. Hiervoor gebruik de volgende prompt geschreven:

```
Build a page showing Lego Minifig records as a gallery of cards using modern look & feel. All cards should have fixed size and tall enough to fit 3 lines of titles. Include name, image url (as image in the card) on the top of the card, and num parts as a badge. Add pagination and show maximum of 24 items per page.

Make the component fill 100% of the space. Make the gallery scrollable. Use data from the Lego Minifig table. Make each card clickable to open the Lego Minifig record in a new window. The target URL should be current location path with following query string parameters: pagetype=entityrecord&etn=[entityname]&id=[recordid] where entityname is rsdk_legominifig and id is rsdk_legominifigid. 

Add a search field to search all lego minifigs on name.
```


Open je model-driven app in design moddus

Kies voor Add page en vervolgens voor Describe a page

![Model-driven app - describe your page](./assets/1-mda-describe-your-page.gif)

Nu kunnen we onze pagina beschrijven, hiervoor gebruik ik een eerder geschreven prompt, zoals hierboven beschreven. Na het plakken voegen we ook de juiste tabel toe aan de beschrijving.

![Model-driven app - paste prompt, add tables and generate page](./assets/2-mda-generate-page.gif)

De pagina is nu aangemaakt en we kunnen deze in de app nu bekijken en testen.

![Model-driven app - try new generative page](./assets/3-mda-generate-try.gif)

Als de pagina aangemaakt is dan krijgt deze een default naam (Generative Page x), het is raadzaam om de naam nu alvast aan te passen naar een logische naam, dit helpt je verderop in het proces.

![Model-driven app - Generative page change name and publish](./assets/4-mda-change-name-publish.gif)

Vergeet - als je klaar bent - de pagina niet te publishen.



## Download generative page

We hebben nu dus een generative page aangemaakt via de in-app designer van de model-driven app. We gaan deze pagina nu downloaden naar onze IDE (in dit geval Visual Studio code), zodat we deze lokaal kunnen bewerken. 

Start Visual Studio code

Open een terminal en geef het volgende commando in

```
copilot
```

GitHub Copilot CLI zal nu starten

![Start GitHub Copilot CLI](./assets/5-copilot-start.gif)

We gaan nu de genpage skill starten met het volgende commando

```
/model-apps:genpage
```

Copilot zal wat controles voor je uitvoeren met betrekking tot de aanwezigheid van Pac cli, Node.js etc.

![GitHub Copilot CLI - Start genpages skill](./assets/6-copilot-genpage-skill.gif)

Als alle controles succesvol zijn uitgevoerd zal de eerste vraag van Copilot zijn of je een neiuwe pagina wilt aanmaken of een bestaande wilt wijzigen.

In dit geval kiezen voor ```2. Edit an existing page```

![GitHub Copilot CLI - Edit an existing page](./assets/7-copilot-edit-existing.gif)

De volgende vraag is in welke app de pagina die je wilt wijzigen zich bevind

In dit voorbeeld is dat de app **Gen Pages Demo** 

Vervolgens zal de vraag worden gesteld **Wich page would you like to edit?**

In dit voorbeeld kiezen we voor de zojuist aangemaakte generative page met de naam **Lego Minifig Gallery**

![GitHub Copilot CLI - Choose app and page](./assets/8-copilot-choose-app-and-page.gif)

De page zal nu worden gedownload. Als deze klaar is zal een nieuwe map met de naam **lego-minifigs-edit** beschikbaar zijn in je file explorer.

![GitHub Copilot CLI - Downloaded folder structure](./assets/9-copilot-folder-structure.png)


## Folders & files

Before we continue, let’s take a look at the folder and its contents that were just downloaded by Copilot. As you can see, four files have been downloaded:

* config.json
* page.js
* page.tsx
* prompt.txt

If we compare this with my earlier blog—where we created a new gen page directly through GitHub Copilot CLI—you’ll notice that slightly different files are generated. These are the final files that Power Apps uses to ‘render’ the page.

One interesting thing to see is that the prompt.txt file contains the prompts we previously used when describing the page in the model-driven app.

In the next steps, you’ll see that changes will occur in these files when we upload the page back to Power Apps. For example, a runtimeTypes.ts file will be generated, which contains the required structure of the linked Dataverse tables.

It’s also good to know that the Power Platform Skills plugin used here relies on the new PAC model commands. One of these commands is pac model genpage transpile, which converts the TypeScript code into JavaScript so that Power Apps can read and serve it.


## Make changes

Nu we de pagina hebben gedownload kunnen we deze lokaal bewerken. Ook hiervoor blijf ik gebruik maken van GitHub Copilot CLI. 

Beter nog, Copilot zal je na het downloaden vragen welke wijzigingen je zou willen toevoegen aan de pagina. Ook hiervoor heb ik een simpele prompt voorbereid. 

```
The image section of the card has a light gray background. Make the background transparent. So that it has the same background color as the card.

Center the ‘number of parts’ badge horizontally within the card.
```

Geef je gewenste wijzigingen op, ik plak hiervoor bovenstaande prompt

![GitHub Copilot CLI - Describe your changes for the page](./assets/10-copilot-describe-your-changes.gif)

Copilot zal nu eerst samenvatting geven van de wijzigingen die het zal doorvoeren en deze vervolgens ook daadwerkelijk doorvoeren.



## Publish to Power Apps

Als de wijzigingen zijn doorgevoerd zal Copilot je vragen of je de pagina wilt publiceren naar Power Apps. 

Ik kies hier voor ```1. Yes, publish it```

![GitHub Copilot CLI - Publish to app](./assets/11-copilot-publish.gif)

Voordat Copilot de pagina echt zal publiceren naar Power apps zal het je eerst vragen of je het resultaat wilt verifieren in de browser.

Ik kies hier voor ```1. Yes, verify in browser```

![GitHub Copilot CLI - Verify in browser](./assets/12-copilot-verify-in-browser.gif)

Copilot zal Playwright gebruiken om een browser te openen en de generative page weer te geven.

![GitHub Copilot CLI - Playwright open browser](./assets/13-copilot-playwright-browser.png)

De gevraagde wijzigingen zijn nu doorgevoerd en Copilot zal nog een samenvatting geven van alle taken die het heeft uitgevoerd. 

![GitHub Copilot CLI - Summary](./assets/14-copilot-summary.png)


## Wrapping up

GitHub Copilot CLI voegt een nieuwe optie toe aan de vele andere mogelijkheden voor vibe coding binnen het Power Platform. Als groot fan van CLI tools kan ik ook deze CLI enorm waarderen. 

De eerlijkheid gebied wel te zeggen, dat voor mij de combinatie van GitHub Copilot CLI in combinatie met de Power Platform skills plugin (repository) de echt waarde toevoegt. De manier waarop Copilot je via de CLI meeneemt in het proces van maken, wijzigen, testen en deployen van apps (of in dit geval generative pages) maakt het zeer prettig om mee te werken. 

Inmiddels is ook duidelijk geworden dat aan de Power Platform skills plugin binnenkort ook de plugin voor Code apps beschikbaar zal komen. Met deze aanvulling hebben we straks niet alleen de mogelijkheid om genpages via de CLI te bouwen, maar ook single page applications voor Power Pages en Code apps voor Power Apps, zondaer dat we daarbij zelf hoeven na te denken over agents, skills, hooks etc.

Mocht GitHub Copilot CLI (en dan vooral de laatste afkorting) je afschrikken? Kijk dan ook eens naar de [GitHub Copilot CLI for Beginners](https://github.com/github/copilot-cli-for-beginners) repository on GitHub. 




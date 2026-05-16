---
layout: BlogDetail
sidebar: false
title: Code Apps Insights
subtitle: Application Insights
description: ???
image: /images/blog/power-automate-flows.jpg
status: concept
date: 2026-05-20
tags: Power Apps, Azure
author: ARJAN RIJSDIJK
---


# Azure Applcation Insights

Application Insights is een oplossing binnen Azure Monitor. 


# Azure Subscription & Resource

Voordat we onze code apps kunnen koppelen aan Application Insights, moeten we dus eerst een Application Insights resource aanmaken in Azure. Hoe je dat doet lezen in het volgende artikel. 

https://learn.microsoft.com/en-us/azure/azure-monitor/app/create-workspace-resource?tabs=portal

Als je eenmaal de Azure Application Insights resource hebt aangemaakt, dan hebben we de gegenereere connection string nodig. Zie hieronder waar je deze connecties in kunt vinden. 

[screenshot]


# Insights in Code Apps

In dit hoofdstuk gaan we kijken hoe we application insights kunnen koppelen aan AI-generated Code apps binnen het Power Platform. We maken hierbij gebruik van het Application Insights SDK for web.

Om deze SDK te installeren binnen je app, maak je gebruik van het commando. 

```bash
npm install @microsoft/applicationinsights-web
```



## How to
 

## Skill




## Logs



# Insights in Canvas apps

En dit hoofdstuk laat ik zien hoe je application insights kunt koppelen aan je Canvas apps. Ook in dit geval hebben we de connectionsing nodig uit je Azure Application Insights resource. 

## Configure

Om application insights aan je Canvas app te koppelen, ga je eerst naar de Application Insights resource en kopieer je de connection string. 

[screenshot]

Ga nu naar je Canvas app. Klik op app. Kijk aan de rechterkant naar je properties, je eigenschappen. Daar vind je de optie connection string. Plak de eerder gecopieerde connection string in dat veld. 

[Screenshot]

Je app is nu direct gekoppeld aan je application Insights. Ga nu naar Azure, Application Insights, en klik in het linker menu op log, zodat je daar kunt zien wat er allemaal gelocht is. 

[Screenshot]


## Trace

Je hebt zelf ook invloed op wat er in het log zal worden gelogd. Dit kun je doen met de trace functie in Canvas Apps. Een trace functie is een power fx functie waarmee je traces kunt plaatsen binnen je app. Dit hoeven niet alleen errors te zijn, maar kunnen bijvoorbeeld ook warning of informatieve traces zijn. 

Plaats een button in je Canvas app en geef je de naam Trace. En voegt de volgende PowerFX code toe aan deze button in de unselect eigenschap. 

```fx
Trace()
```

Dit ziet er dan al als volgt uit. 

[Screenshot]

Speel nu de app af, klik op de button Trace en naviger vervolgens naar je Azure Applications Insights omgeving om daar het resultaat te zien. 

[Screenshot]



## Logs



# Connection string


# What's next







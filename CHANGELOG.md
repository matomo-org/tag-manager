## Changelog

0.2.6

* Fix changing name of variable causes removing trigger in a tag
* Added possibility to configure set secure cookies for Matomo Tracker
* Added fallback to load JS tracker if bundling the Matomo JS tracker didn't work
* Added new tags
  * VWO (kudos to @MichaelHeerklotz)
  * Emarsys (kuds to @MichaelHeerklotz)
  * Bing (kuds to @Findus23)
  * LiveZilla (kuds to @scysys)
  * ThemeColor (kuds to @Findus23)
  * Drift (kuds to @Findus23)

0.2.5

* Add possibility to bundle Matomo JS tracker with a container

0.2.4

* Add support for Click and Form Element Match CSS Selector 
* Fix trigger update button does not become active after removing a condition
* Added new tags
  * bugsnag (kudos to @Findus23)

0.2.3

* Link to Manage Tags page in top menu when user has only view access to prevent seeing Log in screen

0.2.2

* Fix a Matomo Tag may track a page view multiple times when the Matomo Tag was used multiple times within a container
* Added new tags
  * AddThis (kudos to @Findus23)
  * Honeybadger (kudos to @Findus23)
  * Raygun (kudos to @Findus23)
  * Shareaholic (kudos to @Findus23)

0.2.1

* Added new tags
  * Zendesk Chat (kudos to @Findus23)
  * Pingdom Real User Monitoring (kudos to @sgiehl)
  * LinkedIn Insight (kudos to @Findus23)
  * Tawk.to (kudos to @Findus23)
  * Sentry.io (kudos to @Findus23)

0.2.0

* Support Matomo's new capability system for a more granular permission system and to improve security. Introduces three new capabilities
 * Tag Manager Write
 * Use Custom Template
 * Publish Live Container
* New API method `TagManager.getAvailableEnvironmentsWithPublishCapability`
* Custom HTML tag supports assigning JavaScript variables, CSS styles and HTML content
* Added Facebook Pixel tag (kudos to @danielmcclure)

0.1.1

* Fixed CustomEventsTrigger may miss an event when pushed before tag manager is loaded
* Improved various wordings and fixed some typos
* Translation updates
* Added possibility to specify position of custom html tag
* Anonymize the visitor's IP address in Google Analytics
* Added possibility to configure different storage and web directory for container files

0.1.0

* Initial beta release

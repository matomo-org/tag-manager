## Changelog

0.2.0
* Support Matomo's new capability system for a more granular permission system and to improve security. Introduces three new capabilities
 * Tag Manager Write
 * Use Custom Template
 * Publish Live Contaier
* New API method `TagManager.getAvailableEnvironmentsWithPublishCapability`
* Custom HTML tag supports assigning JavaScript variables, CSS styles and HTML content

0.1.1
* Fixed CustomEventsTrigger may miss an event when pushed before tag manager is loaded
* Improved various wordings and fixed some typos
* Translation updates
* Added possibility to specify position of custom html tag
* Anonymize the visitor's IP address in Google Analytics
* Added possibility to configure different storage and web directory for container files

0.1.0
* Initial beta release

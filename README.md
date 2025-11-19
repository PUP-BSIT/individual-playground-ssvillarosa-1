# Changes and Added Files

## CountrySearchComponent
This component contains the form and its related implementation.

## SiteService
This service is use to site wide events such as the loading bar and snackbar. Instead of each component having an individual loading bar, I place the loading bar only in the header. The root component observes the siteLoadingListener from this service and will display the loading bar if the siteLoadingListener emits true and hide the loading bar if it emits false. This way, the loading indicator can be displayed and hidden from any component. The same concept is applied in the sidebar. For the snackbar, instead of each component have their own instance of snackbar, I created a function showSnackBar that accepts a message and action(default value is 'Close'). This way, components will only call this function instead of having an instance of SnackBar.
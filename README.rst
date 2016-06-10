GEIX Horizon Theme
==================

Custom made horizon theme to allow info box with help for a page.


Install
=======
Download the contents of this repo to anywhere on the file system as long as the 
user running Horizon has read access. Next edit your Horizon ``local_settings.py`` file 
to point at this theme. If you downloaded the theme and put it in ``/opt/horizon/themes/geix`` 
and your horizon is downloaded (for example using DevStack) in ``/opt/stack/horizon`` then you edit 
``/opt/stack/horizon/openstack_dashboard/local/local_settings.py`` and add ``CUSTOM_THEME_PATH='/opt/horizon/themes/geix'`` 
and be sure no other ``CUSTOM_THEME_PATH`` variables have been defined. Next save that file and exit. Go to 
``/opt/stack/horizon`` and run: ``python manage.py collectstatic --noinput; python manage.py compress;`` You should see 
some ouput like:
``
0 static files copied to '/opt/stack/horizon/static', 1372 unmodified.
RemovedInDjango19Warning: Loading the `url` tag from the `future` library is deprecated and will be removed in Django 1.9. Use the default `url` tag instead.
WARNING:py.warnings:RemovedInDjango19Warning: Loading the `url` tag from the `future` library is deprecated and will be removed in Django 1.9. Use the default `url` tag instead.
Found 'compress' tags in:
        /opt/horizon/themes/geix/templates/_header.html
        /opt/stack/horizon/openstack_dashboard/templates/horizon/_scripts.html
        /opt/stack/horizon/openstack_dashboard/templates/_stylesheets.html
        /opt/stack/horizon/openstack_dashboard/templates/horizon/_conf.html
        Compressing... SassDeprecationWarning: Can't find any matching rules to extend u'.mdi-view-grid' -- thiswill be fatal in 2.0, unless !optional is specified! (at custom/horizon/_icons.scss:11)
        WARNING:py.warnings:SassDeprecationWarning: Can't find any matching rules to extend u'.mdi-view-grid' -- thiswill be fatal in 2.0, unless !optional is specified! (at custom/horizon/_icons.scss:11)
        done
        Compressed 5 block(s) from 4 template(s) for 1 context(s).
``
Next you can just restart apache2 and this theme should be active.


Setup
=====
This theme supports an info box on pages. To get the info box you must have a web site with static content to load the info from
The location of the static site is defined in `geix/static/js/double-cheeseburger.js` the `var $info_site` should be set to your 
static doc site. The naming convention expected for docs on the remote site matches what is in your horizon view. For example 
if in horizon you are at: http://horizon_dashboard/admin/instances/ and your doc site was running at http://127.0.0.1:8000 then 
for a help doc to load into http://horizon_dashboard/admin/instances/ you need a static help doc at: http://127.0.0.1:8000/admin/instances.html 
You can and likely will run into `No 'Access-Control-Allow-Origin' header is present on the requested resource` when setting this 
up. The most simple way to work around it is to use `mod_headers` in apache2 and to set the header to allow your horizon site.


Bugs
====

Please report bugs using the github issue tracker.


Platforms
=========

This has been tested on the Liberty release of Horizon but may work on others as well.



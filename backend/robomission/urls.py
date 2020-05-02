"""Main URL Configuration
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView, TemplateView
import learn
import os
from learn import social

# The precache-manifest may be generated with a new name, so we need to get it manually
files_in_root = []
for file in os.listdir(os.path.join(settings.REPO_DIR,'frontend', 'build')):
    files_in_root.append(file)
precache_manifest_path = [f for f in files_in_root if ("precache-manifest" in f)][0]

urlpatterns = [
    # Top-level public assets (such as favicon.ico and robots.txt) starts in
    # frontend public directory, then arecopied into frontend build directory,
    # and then copied into backend static directory, under `public` namespace.
    # To make sure they work (even during development, although that is not
    # necessary), redirects are created to them. In production, nginx should be
    # configured to directly access these files (for performance reasons).
    url(r'^favicon.ico$',
        RedirectView.as_view(
            url=staticfiles_storage.url('public/favicon.ico'),
            permanent=False),
        name='favicon.ico'),
    url(r'^robots.txt$',
        RedirectView.as_view(
            url=staticfiles_storage.url('public/robots.txt'),
            permanent=False),
        name='robots.txt'),
    url(r'^manifest.json$',
        RedirectView.as_view(
            url=staticfiles_storage.url('public/manifest.json'),
            permanent=False),
        name='manifest.json'),
    url(r'^service-worker.js$', (TemplateView.as_view(
                                  template_name="service-worker.js",
                                  content_type='application/javascript',
                              )), name='service-worker.js'),
    url(r'^index.html$',
            RedirectView.as_view(
                url=staticfiles_storage.url('public/index.html'),
                permanent=False),
            name='index.html'),
    url('^'+precache_manifest_path+'$', (
            TemplateView.as_view(template_name=precache_manifest_path,
                                 content_type='application/javascript', )),
             name=precache_manifest_path),

    url(r'^learn/', include('learn.urls')),
    url(r'^monitoring/', include('monitoring.urls')),
    url(r'^rest-framework-auth/', include('rest_framework.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', social.FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/google/$', social.GoogleLogin.as_view(), name='google_login'),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^($|about|task|monitoring)', learn.views.frontend_app, name='frontend_app'),
]

# Set up media serving for development.
if settings.DEVELOPMENT:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
